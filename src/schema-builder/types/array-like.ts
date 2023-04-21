import { Schema, ValidationContext } from '../schema';

export class ArrayLikeSchema extends Schema {
  private _integers = false;
  public integers(integers = true) {
    this._integers = integers;
    return this;
  }

  private _min = 1;
  public min(min: number) {
    if (!Number.isInteger(min) || min < 1) throw new Error('Min value count is invalid');
    this._min = min;
    return this;
  }

  private readonly _max?: number;
  public max(max: number) {
    if (!Number.isInteger(max) || max < 2) throw new Error('Max value count is invalid');
    this._min = max;
    return this;
  }

  public toTypeScript() {
    return 'number | string';
  }

  public toSchema(): object {
    // TODO: `.0`
    const charPattern = this._integers ? '-?\\d+' : '-?\\d+\\.?\\d*';
    const countPattern = `{${this._min - 1},${this._max == null ? '' : this._max - 1}}`;
    const pattern = `^(?:${charPattern} )${countPattern}${charPattern}$`;

    return this._min === 1
      ? { oneOf: [{ type: 'string', pattern }, { type: this._integers ? 'integer' : 'number' }] }
      : { type: 'string', pattern };
  }

  public validate(baseValue: unknown, context: ValidationContext) {
    if (typeof baseValue !== 'string' && typeof baseValue !== 'number') {
      context.addErrorThere('should be a string or a number');
      return;
    }

    const elements = String(baseValue).split(' ');

    if (elements.length < this._min) {
      context.addErrorThere(
        `has ${elements.length} elements when at least ${this._min} is expected`,
      );
    }

    if (this._max != null && elements.length > this._max) {
      context.addErrorThere(
        `has ${elements.length} elements when no more then ${this._max} is expected`,
      );
    }

    elements.forEach((element, index) => {
      const valueContext = context.of(index);
      const number = Number(element);
      if (Number.isNaN(number)) {
        valueContext.addErrorThere(`should be a${this._integers ? 'n integer' : ' number'}`);
      } else if (this._integers && number % 1 !== 0) {
        valueContext.addErrorThere('should be an integer');
      }
    });
  }
}
