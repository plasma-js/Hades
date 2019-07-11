class Events {
  constructor() {
    this.events = [];
    this.history = [];
    this.getters = [];
  }

  /**
   * Event trigger
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
   * Event subscriber
   * @param  {string}   e
   * @param  {function}   f
   */
  on(e, f) {
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

export default Events;