import Collection from './collection';

export default class Collections {
  new (name, fields) {
    if (!this[name]) {
      this[name] = new Collection(fields);
    } else {
      throw new Error(`Collection '${name}' already exists!`);
    }
  }

  remove (name){
    if (this[name]) {
      this[name] = null;
      delete this[name];
    } else {
      throw new Error(`Collection '${name}' not found!`);
    }
  }
}