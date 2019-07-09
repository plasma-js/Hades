import Collection from './collection';

export default class Collections {
  constructor() {
    this.list = [];
  }

  new (name, fields) {
    if (!this[name]) {
      this[name] = new Collection(fields);
      this.list[name] = this[name];
    } else {
      throw new Error(`Collection '${name}' already exists!`);
    }
  }

  list () {
    return this.list;
  }

  remove (name) {
    if (this[name] && this.list[name]) {
      this[name] = null;
      delete this[name];
      delete this.list[name];
    } else {
      throw new Error(`Collection '${name}' not found!`);
    }
  }
}