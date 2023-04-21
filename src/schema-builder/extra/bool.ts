import { Schema, ValidationContext } from '../schema';

export class BoolSchema extends Schema {
  public toTypeScript() {
    return 'boolean';
  }

  public toSchema(): object {
    return { type: 'boolean' };
  }

  public validate(value: unknown, context: ValidationContext) {
    if (typeof value !== 'boolean') {
      context.addErrorThere('should be a boolean', value);
    }
  }
}
