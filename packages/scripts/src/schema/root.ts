import { Schema, TsContext, ValidationContext, ValidationOptions } from './schema';
import { ObjectSchema } from './types/object';
import { OneOfSchema } from './types/one-of';

export class RootSchema extends ObjectSchema {
  public _name = 'Root';
  public constructor() {
    super();
  }

  /** @deprecated use toTypeScriptRoot instead */
  public toTypeScript(): never {
    throw new Error("RootSchema.toTypeScript() shouldn't be used. Use toTypeScriptRoot instead");
  }

  /** @deprecated use validateRoot instead */
  public validate(): never {
    throw new Error("RootSchema.validate() shouldn't be used. Use validateRoot instead");
  }

  public toTypeScriptRoot(namespace?: string) {
    const context = new TsContext();
    super.toTypeScript(context);

    const declarations = context.getDeclarations();
    const declarationsContent = declarations.join('\n\n') + '\n';
    const content = namespace
      ? `declare namespace ${namespace} {\n${declarationsContent.replace(/^(?!$)/gm, '    ')}}\n`
      : declarationsContent;

    return { content, globals: context.getGlobals() };
  }

  public validateRoot(value: unknown, options: ValidationOptions = {}) {
    const context = new ValidationContext(options);
    super.validate(value, context);
    return context.errors;
  }

  public toSchema(): object {
    const result: any = { $schema: 'http://json-schema.org/draft-07/schema#', ...super.toSchema() };
    if (!result.properties) result.properties = {};
    result.properties.$schema = { type: 'string' };
    return result;
  }

  public getRestRoots() {
    if (this._rest == null) throw new Error('Schema has no rest elements');
    const schema = this._rest.schema;
    return schema instanceof OneOfSchema ? schema.getFlatChildren() : [schema];
  }

  public getRestRootsLike<T extends Schema>(type: new (...args: any[]) => T): T[] {
    return this.getRestRoots().filter((x): x is T => x instanceof type);
  }
}
