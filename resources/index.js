import 'babel-polyfill'
import Collections from './collections/index'

class Hades {
  constructor(init) {
		this.collections = new Collections();
    this.events = [];
    this.history = [];
    this.getters = [];

    if (init && typeof init === "function") init.bind(this);
	}

  /**
   * Event publisher
   * @param  {string} event
   * @param  data
   */
  publish(event, data = null) {
    const e = this.events[event];

    if (e && e.length) {
      e.forEach((f) => {
        f.bind(this, data);
      });
    } else {
      throw new Error('Event called before one handler definition.');
    }
  }

  /**
   * Event handler register
   * @param  {string}   e
   * @param  {function}   f
   */
  subscribe(e, f) {
    if (e && typeof e === "string") {
      if (!this.events[e]) {
        this.events[e] = [];
      }

      if (f && typeof f === "function") {
        this.events[e].push(f);
      } else {
        throw new Error('The second param is required and should be a function!');
      }
    } else {
      throw new Error('The first param is empty or invalid.');
    }
  }

}

export default Hades;