import { Schema, ValidationContext } from '../schema';

export class StringSchema extends Schema {
  public _pattern?: RegExp;
  public pattern(pattern: RegExp) {
    this._pattern = pattern;
    return this;
  }

  public toTypeScript() {
    return 'string';
  }

  public toSchema(): object {
    return { type: 'string', pattern: this._pattern?.source };
  }

  public validate(value: unknown, context: ValidationContext) {
    if (typeof value !== 'string') {
      context.addErrorThere('should be a string');
    } else if (this._pattern != null && !this._pattern.test(value)) {
      context.addErrorThere(`should match pattern: ${this._pattern}`);
    }
  }
}
