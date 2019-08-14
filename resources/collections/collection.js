import Event from '../events/index';
import yupParser from '../utils/yupParser';
import ValidationError from '../utils/validationError';
import * as yup from 'yup';

export default class Collection extends Event {
  constructor(fields) {
    super();
    if (!fields) throw new Error('Constructor invalid! The \'fields\' param is null or undefined!');

    this.data = [];
    this.fields = fields;
    this.model = yupParser(this.fields);
    this.schema = this.mapSchema(this.model);
  }

  async add(data) {
    try {
      await this.validate(data);
      data._id = Date.now();
      this.data.push(data);

      return this.data[this.data.length];
    } catch (err) {
      throw new ValidationError(err);
    };
  }

  runner(level) {
    let v = yup;

    Object.keys(level).forEach((k) => {
      let arg = level[k];

      v = v[k].call(this, arg);
    });

    return v;
  }

  mapEntries(a) {
    let entries = {};

    Object.keys(a).forEach((v) => {
      entries[v] = a[v];
    });

    return entries;
  }

  mapSchema(a, b = null) {
    let schema = yup;

    Object.keys(a).forEach((v) => {
      if (!b) {
        if (v === 'object' || v === 'array') {
          if (a[v] !== null) {
            schema = schema[v].call(schema, a[v]);
          } else {
            schema = schema[v].call(schema);
          }
        } else if (v === 'shape' || v === 'of') {
          schema = schema[v].call(schema, this.mapSchema(a[v], v));
        } else {
          if (a[v] !== null) {
          } else {
            schema = schema[v].call(schema);
          }
        }
      } else {
        if (b === 'shape') {
          if (schema === yup) schema = {};
          
          schema[v] = this.mapSchema(a[v]);
        } else if (b === 'of') {
          schema = this.mapSchema(a[v]);
        }
      }
    });

    return schema;
  }

  async validate(data) {
    if (typeof this.schema.validate === "function") {
      return this.schema.validate(data);
    } else {
      throw new Error('Unable to validate without a model schema.');
    }
  }
}
