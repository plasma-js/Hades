import yupParser from '../utils/yupParser';
import * as yup from 'yup';

export default class Collection {
  constructor(fields) {
    if (!fields) throw new Error('The second param \'fields\' is obrigatory!');

    this.data = [];
    this.fields = fields;
    this.model = yupParser(this.fields);
    this.schema = this.mapSchema(this.model);

    console.log(this.fields);
    console.log(this.model);
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

  mapSchema(a, b = undefined) {
    const schema = b;

    Object.keys(a).forEach((v) => {
      let newLevel = false;

      if (v !== 'shape' || v !== 'of') {
        schema = yup[v].call(this, a[v]);
      } else {
        schema[v].call(this, this.mapSchema(a[v], {})) 
      }
    });
    
    return schema;
  }

  // async validate(data) {
  //   return this.schema.isValid(data);
  // }
}