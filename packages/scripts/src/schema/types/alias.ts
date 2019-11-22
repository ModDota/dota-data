import { Schema, TsContext, ValidationContext } from '../schema';

export class AliasSchema extends Schema {
  constructor(private readonly name: string, private readonly to: Schema) {
    super();
  }

  public getChildren() {
    return [this.to];
  }

  public toTypeScript(context: TsContext) {
    context.addNamedType(this.name, this.to.toTypeScript(context));
    return this.name;
  }

  public toSchema() {
    return this.to.toSchema();
  }

  public validate(value: unknown, context: ValidationContext) {
    this.to._validateWithHooks(value, context);
  }
}
