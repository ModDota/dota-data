import { Schema, ValidationContext } from '../schema';

export type LiteralSchemaValue = string | boolean | number;
export class LiteralSchema extends Schema {
  constructor(public _value: LiteralSchemaValue) {
    super();
  }

  public toTypeScript() {
    if (typeof this._value === 'string') return JSON.stringify(this._value);
    return String(this._value);
  }

  public toSchema(): object {
    return { const: this._value };
  }

  public validate(value: unknown, context: ValidationContext) {
    if (value !== this._value) context.addErrorThere(`should be "${this._value}"`, value);
  }
}
