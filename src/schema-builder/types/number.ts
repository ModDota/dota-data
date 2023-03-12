import { Schema, ValidationContext } from '../schema';

export class NumberSchema extends Schema {
  private _integer = false;
  public integer(integer = true) {
    this._integer = integer;
    return this;
  }

  private _min?: number;
  public min(min?: number) {
    this._min = min;
    return this;
  }

  private _max?: number;
  public max(max?: number) {
    this._max = max;
    return this;
  }

  public toTypeScript() {
    return 'number';
  }

  public toSchema(): object {
    return { type: this._integer ? 'integer' : 'number' };
  }

  public validate(value: unknown, context: ValidationContext) {
    if (typeof value !== 'number') {
      context.addErrorThere(`should be a${this._integer ? 'n integer' : ' number'}`);
      return;
    }

    if (this._integer && value % 1 !== 0) {
      context.addErrorThere('should be an integer');
    }

    if (this._min != null && value < this._min) {
      context.addErrorThere(`should be greater than ${this._min}`);
    }

    if (this._max != null && value > this._max) {
      context.addErrorThere(`shouldn't be greater than ${this._max}`);
    }
  }
}
