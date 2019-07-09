import yupParser from '../utils/yupParser';
import * as yup from 'yup';

export default class Collection {
  constructor(fields) {
    if (!fields) throw new Error('The second param \'fields\' is obrigatory!');

    this.data = [];
    this.fields = fields;
    this.model = yupParser(this.fields);
    this.schema = this.mapSchema(this.model);
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
    if (this.schema instanceof yup) {
      let result = this.schema.validate(data);
      return result;
    } else {
      throw new Error('Unable to validate with a undefined model schema.');
    }
  }
}