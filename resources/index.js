import 'babel-polyfill'
import Collections from './collections/index'
import Events from './events/index'
import Collection from './collections/collection'

class Hades extends Events {
  constructor(init) {
    super();
		this.collections = new Collections();

    if (init && typeof init === "function") init.bind(this);
	}
}

export default Hades;
export {
  Collections,
  Collection,
  Events
}