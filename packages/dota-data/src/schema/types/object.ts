import _ from 'lodash';
import { Schema, TsContext, ValidationContext } from '../schema';

export interface ObjectSchemaField {
  name: string;
  value: Schema;
  require: boolean;
  description?: string;
}

interface FieldOptions {
  require?: boolean;
  export?: boolean;
  description?: string;
  deprecated?: string;
}

export class ObjectSchema extends Schema {
  protected _fields: ObjectSchemaField[] = [];
  protected _rest?: { schema: Schema; of: 'string' | 'number' | RegExp };
  constructor(public _name?: string) {
    super();
  }

  public getChildren() {
    return [...this._fields.map(x => x.value), ...(this._rest != null ? [this._rest.schema] : [])];
  }

  public clone() {
    const copy = new ObjectSchema(this._name);
    copy._fields = [...this._fields];
    if (this._rest != null) copy._rest = { schema: this._rest.schema, of: this._rest.of };
    return copy;
  }

  public delete(name: string) {
    this._fields = this._fields.filter(x => x.name !== name);
    return this;
  }

  public field(name: string, value: Schema, options: FieldOptions = {}) {
    this.insertOrReplaceField({ name, value, require: false, ...options });
    return this;
  }

  public fields(fields: [string, Schema, FieldOptions?][]) {
    fields.forEach(field => this.field(...field));
    return this;
  }

  public fieldBefore(before: string, name: string, value: Schema, options: FieldOptions = {}) {
    this.setFieldNear({ name, value, require: false, ...options }, before, -1);
    return this;
  }

  public fieldsBefore(before: string, fields: [string, Schema, FieldOptions?][]) {
    fields.forEach(field => this.fieldBefore(before, ...field));
    return this;
  }

  public fieldAfter(after: string, name: string, value: Schema, options: FieldOptions = {}) {
    this.setFieldNear({ name, value, require: false, ...options }, after, 1);
    return this;
  }

  public fieldsAfter(after: string, fields: [string, Schema, FieldOptions?][]) {
    _.forEachRight(fields, field => this.fieldAfter(after, ...field));
    return this;
  }

  public rest(schema: Schema, of: 'string' | 'number' | RegExp = 'string') {
    this._rest = { schema, of };
    return this;
  }

  private setFieldNear(field: ObjectSchemaField, otherFieldName: string, offset: 1 | -1) {
    const otherIndex = this._fields.findIndex(x => x.name === otherFieldName);
    if (otherIndex === -1) {
      this.insertOrReplaceField(field);
      return this;
    }

    const index = this._fields.findIndex(x => x.name === field.name);
    if (index === -1) {
      this._fields.splice(otherIndex + offset, 0, field);
      return;
    }

    if (index === otherIndex) {
      this._fields[index] = field;
    } else {
      this._fields.splice(index, 1);
      this._fields.splice(otherIndex + offset + (otherIndex < index ? 0 : -1), 0, field);
    }
  }

  private insertOrReplaceField(field: ObjectSchemaField) {
    const index = this._fields.findIndex(x => x.name === field.name);
    if (index === -1) {
      this._fields.push(field);
    } else {
      this._fields[index] = field;
    }
  }

  public toTypeScript(context: TsContext) {
    const restType =
      this._rest != null
        ? `Record<${
            this._rest.of === 'number' ? 'number' : 'string'
          }, ${this._rest.schema.toTypeScript(context)}>`
        : null;

    const fields = this._fields.map(({ name, value, require, description }) => {
      const property = `${name}${require ? '' : '?'}: ${value.toTypeScript(context)};`;
      const fullDeclaration = description ? `/**\n * ${description}\n */\n${property}` : property;

      return fullDeclaration.replace(/^/gm, '    ');
    });
    const fieldsType = fields.length > 0 ? `{\n${fields.join('\n')}\n}` : null;

    const type = [fieldsType, restType].filter(x => x != null).join(' & ');
    if (this._name == null) return type;
    context.addNamedType(this._name, type);
    return this._name;
  }

  public toSchema(): object {
    return {
      type: 'object',
      ...(this._fields.length > 0
        ? {
            required: this._fields.filter(x => x.require).map(x => x.name),
            properties: _.fromPairs(
              this._fields.map(({ name, value, description }) => [
                name,
                { description, ...value.toSchema() },
              ]),
            ),
          }
        : {}),
      // TODO:
      additionalProperties: this._rest == null ? false : this._rest.schema.toSchema(),
    };
  }

  public validate(object: unknown, context: ValidationContext) {
    if (typeof object !== 'object' || object == null) {
      context.addErrorThere('should be an object');
      return;
    }

    this._fields.forEach(({ name, value, require }) => {
      const fieldContext = context.of(name);
      const fieldValue: unknown = (object as any)[name];
      if (fieldValue == null) {
        if (require) fieldContext.addErrorThere('is missing');
        return;
      }

      value._validateWithHooks(fieldValue, fieldContext);
    });

    const restKeys = _.difference(
      Object.keys(object),
      this._fields.map(x => x.name),
    );

    if (this._rest == null) {
      restKeys.forEach(k => context.of(k).addErrorThere('is unknown'));
      return;
    }

    for (const name of restKeys) {
      const childContext = context.of(name);
      let checkChild = true;
      if (this._rest.of === 'number') {
        if (Number.isNaN(Number(name))) {
          childContext.addErrorThere("is unknown and isn't a number");
          checkChild = false;
        }
      } else if (this._rest.of !== 'string' && !this._rest.of.test(name)) {
        childContext.addErrorThere(`is unknown and not matches ${this._rest.of} pattern`);
        checkChild = false;
      }

      if (checkChild) {
        const value = (object as any)[name];
        this._rest.schema._validateWithHooks(value, childContext);
      }
    }
  }
}
