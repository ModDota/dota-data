import _ from 'lodash';

export abstract class Schema {
  public abstract toTypeScript(context: TsContext): string;
  public abstract toSchema(): object;
  public abstract validate(value: unknown, context: ValidationContext): void;
  /* @internal */
  public _validateWithHooks(value: unknown, context: ValidationContext) {
    context.beforeVisit(this, value);
    this.validate(value, context);
    context.afterVisit(this, value);
  }

  public getChildren(): Schema[] {
    return [];
  }

  public getChildrenDeep(): Schema[] {
    return [...this.childrenDeep()];
  }

  private *childrenDeep(): IterableIterator<Schema> {
    for (const child of this.getChildren()) {
      yield child;
      yield* child.childrenDeep();
    }
  }

  public getChildrenLike<T extends Schema>(type: new (...args: any[]) => T): T[] {
    return this.getChildren().filter((x): x is T => x instanceof type);
  }

  public getChildrenDeepLike<T extends Schema>(type: new (...args: any[]) => T): T[] {
    return this.getChildrenDeep().filter((x): x is T => x instanceof type);
  }

  public replaceWith(replacement: Schema) {
    // TODO: Consider making something better
    Object.getOwnPropertyNames(this).forEach((k) => delete (this as any)[k]);
    Object.setPrototypeOf(this, Object.getPrototypeOf(replacement));
    Object.assign(this, replacement);
  }
}

export interface ValidationOptions {
  beforeVisit?(schema: Schema, value: unknown, context: ValidationContext): unknown;
  afterVisit?(schema: Schema, value: unknown, context: ValidationContext): unknown;
}

export class ValidationContext {
  public path: (string | number)[] = [];
  public errors: string[] = [];
  constructor(public readonly options: ValidationOptions) {}

  public copy() {
    const context = new ValidationContext(this.options);
    context.errors = this.errors;
    context.path = [...this.path];
    return context;
  }

  public of(next: string | number) {
    const context = new ValidationContext(this.options);
    context.errors = this.errors;
    context.path = [...this.path, next];
    return context;
  }

  public getPath() {
    return _.flatMap(this.path, (element, i) => {
      if (i === 0) return element;
      if (typeof element === 'number') return ['[', element, ']'];
      return ['.', element];
    }).join('');
  }

  public addError(error: string) {
    this.errors.push(error);
  }

  public addErrorThere(error: string) {
    this.addError(`${this.getPath() || 'Root'} ${error}`);
  }

  public beforeVisit(schema: Schema, value: unknown) {
    if (this.options.beforeVisit) this.options.beforeVisit(schema, value, this);
  }

  public afterVisit(schema: Schema, value: unknown) {
    if (this.options.afterVisit) this.options.afterVisit(schema, value, this);
  }
}

interface TsDeclaration {
  name?: string;
  value: string;
}

export class TsContext {
  private readonly declarations: TsDeclaration[] = [];

  public addDeclaration(declaration: string) {
    this.declarations.push({ value: declaration });
  }

  public addNamedDeclaration(name: string, pattern: string) {
    this.declarations.push({ name, value: pattern });
  }

  public addNamedType(name: string, declaration: string) {
    this.addNamedDeclaration(name, `type {name} = ${declaration};`);
  }

  public getDeclarations() {
    return _.uniqBy(this.declarations, (x) => x.value).map((x) =>
      x.name != null ? x.value.replace(/{name}/g, x.name) : x.value,
    );
  }

  private readonly globals = new Set<string>();

  public addGlobal(declaration: string) {
    this.globals.add(declaration);
  }

  public getGlobals() {
    return [...this.globals];
  }
}
