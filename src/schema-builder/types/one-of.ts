import _ from 'lodash';
import { Schema, TsContext, ValidationContext } from '../schema';
import { LiteralSchema } from './literal';

export class OneOfSchema extends Schema {
  private readonly _schemas: Set<Schema>;
  constructor(schemas: Schema[]) {
    super();
    this._schemas = new Set(schemas);
  }

  public getChildren() {
    return [...this._schemas];
  }

  public getFlatChildren(): Schema[] {
    return _.flatMap(this.getChildren(), (child) =>
      child instanceof OneOfSchema ? child.getFlatChildren() : child,
    );
  }

  public add(schema: Schema) {
    this._schemas.add(schema);
  }

  public delete(schema: Schema) {
    this._schemas.delete(schema);
  }

  public toTypeScript(context: TsContext) {
    return [...this._schemas].map((x) => x.toTypeScript(context)).join(' | ');
  }

  public toSchema(): object {
    return { anyOf: [...this._schemas].map((x) => x.toSchema()) };
  }

  public validate(value: unknown, context: ValidationContext) {
    const schemas = [...this._schemas];
    if (schemas.every((s) => s instanceof LiteralSchema)) {
      const literalSchemas = schemas as LiteralSchema[];
      const hookContext = context.copy();
      hookContext.errors = [];
      schemas.forEach((s) => s._validateWithHooks(value, hookContext));

      if (!literalSchemas.some((s) => s._value === value)) {
        context.addErrorThere(
          `is not one of: ${literalSchemas.map((s) => `"${s._value}"`).join(', ')}`,
          value,
        );
      }

      return;
    }

    const results = schemas.map((schema) => {
      const temporaryContext = context.copy();
      temporaryContext.errors = [];
      schema._validateWithHooks(value, temporaryContext);
      return temporaryContext.errors;
    });

    if (results.some((x) => x.length === 0)) return;

    const commonErrors = results[0].filter((k) => results.every((x) => x.includes(k)));
    if (commonErrors.length > 0) {
      commonErrors.forEach(([error, expected]) => context.addError(error, expected));
      return;
    }

    const failedMessages = _.sortBy(results, (x) => x.length)
      .map(
        (x, i) =>
          `${i + 1}. ${x.join('\n').replace(/\n/g, `\n${' '.repeat(String(i + 1).length + 4)}`)}`,
      )
      .join('\n  ');
    context.addErrorThere(`not matches any of:\n  ${failedMessages}`, value);
  }
}
