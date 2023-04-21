import _ from 'lodash';
import enums from '../../../files/engine-enums';
import { Schema, TsContext, ValidationContext } from '../schema';

export class EnumsSchema extends Schema {
  public _flags = false;
  constructor(public _name: string) {
    super();
    this.getDefinition();
  }

  public flags(flags = true) {
    this._flags = flags;
    return this;
  }

  public toTypeScript(_context: TsContext) {
    return 'string';
  }

  public toSchema(): object {
    const names = this.getNames();
    const namesSchema = { enum: names };
    if (!this._flags) return namesSchema;

    const namesPattern = `(${names.map((x) => _.escapeRegExp(x)).join('|')})`;
    return {
      anyOf: [namesSchema, { type: 'string', pattern: `^(${namesPattern} \\| )*${namesPattern}$` }],
    };
  }

  public validate(value: unknown, context: ValidationContext) {
    if (typeof value !== 'string') {
      context.addErrorThere('should be a string', value);
      return;
    }

    const names = this.getNames();

    if (this._flags) {
      value
        .trim()
        .split(/\s*\|\s*/g)
        .forEach((v, i) => {
          if (!names.includes(v)) {
            context.of(i).addErrorThere(`should be a ${this._name} enum`, v);
          }
        });
    } else if (!names.includes(value)) {
      context.addErrorThere(`should be a ${this._name} enum`, value);
    }
  }

  protected getNames() {
    return this.getDefinition().members.map((x) => x.name);
  }

  protected getDefinition() {
    const def = enums.find((x) => x.name === this._name);
    if (def == null) throw new Error(`"${this._name}" is not a valid enum name`);
    return def;
  }
}
