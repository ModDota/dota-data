import { Schema } from '../schema';

export class AnySchema extends Schema {
  public toTypeScript() {
    return 'any';
  }

  public toSchema(): object {
    return {};
  }

  public validate() {
    // Nothing to check
  }
}
