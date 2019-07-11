import Collection from './collection';

export default class Collections {
  constructor() {
    this.data = [];
    this.list = [];
  }

  new (name, fields) {
    if (!this.data[name] && !this[name]) {
      if (typeof fields !== "object") throw new Error('The second param \'Fields\' should be a valid object');
      
      this.data[name] = new Collection(fields);
      this[name] = this.list[name] = this.data[name];
    } else if (!this[name] instanceof Collection) {
      throw new Error(`Unable to create the collection. '${name.charAt(0).toUpperCase()}' is a reserved word.`)
    } else {
      throw new Error(`Collection '${name}' already exists!`)
    }
  }

  list () {
    return this.list;
  }

  remove (name) {
    if (this.data[name]) {
      this.data[name] = null;
      delete this[name];
      delete this.list[name];
      delete this.data[name];
    } else {
      throw new Error(`Collection '${name}' not found!`);
    }
  }
}
