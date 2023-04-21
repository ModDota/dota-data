import _ from 'lodash';
import engineEnums from '../../../files/engine-enums';
import vscriptEnums from '../../../files/vscripts/enums';

import { Schema, TsContext, ValidationContext } from '../schema';

export class EnumsSchema extends Schema {
  public _flags = false;
  constructor(public _name: string) {
    super();
    this.getNames();
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
      context.addErrorThere('should be a string');
      return;
    }

    const names = this.getNames();

    if (this._flags) {
      value
        .trim()
        .split(/\s*\|\s*/g)
        .forEach((v, i) => {
          if (!names.includes(v)) {
            context.of(i).addErrorThere(`should be a ${this._name} enum but is: ${v}`);
          }
        });
    } else if (!names.includes(value)) {
      context.addErrorThere(`should be a ${this._name} enum but is: ${value}`);
    }
  }

  protected getNames() {
    const names: string[] = [];
    const vscriptDefinition = vscriptEnums.find((x) => x.name === this._name);

    function addNames(added: string[]) {
      for (const name of added) {
        if (!names.includes(name)) {
          names.push(name);
        }
      }
    }

    if (vscriptDefinition) {
      if (vscriptDefinition.kind == 'enum') {
        addNames(vscriptDefinition.members.map((x) => x.name));
      } else {
        addNames([vscriptDefinition.name]);
      }
    }

    const engineDefinition = engineEnums.find((x) => x.name === this._name);

    if (engineDefinition) {
      addNames(engineDefinition.members.map((x) => x.name));
    }

    if (names.length == 0) {
      throw new Error(`"${this._name}" is not a valid enum name`);
    } else {
      return names;
    }
  }
}
