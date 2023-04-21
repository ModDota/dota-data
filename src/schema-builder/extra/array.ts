import { Schema, TsContext, ValidationContext } from '../schema';

export class ArraySchema extends Schema {
  constructor(private readonly _items: Schema) {
    super();
  }

  public toSchema(): object {
    return { type: 'array', items: this._items.toSchema() };
  }

  public toTypeScript(context: TsContext) {
    return `${this._items.toTypeScript(context)}[]`;
  }

  public validate(value: unknown, context: ValidationContext) {
    if (!Array.isArray(value)) {
      context.addErrorThere('is not an array', value);
      return;
    }

    value.forEach((element, index) => this._items._validateWithHooks(element, context.of(index)));
  }
}
