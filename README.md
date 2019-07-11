# Hades

A library for data/event handling

## Quickstart

Install:
```bash
npm install --save @plasma-js/hades
```

Then:
```javascript
// const Hades = require('hades').default;
import Hades from 'hades';

const hades = new Hades();
```

## Usage:

### Event manager:

```javascript
const eventName = 'eventExemple';
const eventHandler = function(message) {
  alert(message);
}

// Subscribe
hades.on(eventName, eventHandler);

// Trigger
hades.publish(eventName, 'Trigger message exemple');
```

### Data manager:

```javascript
const collectionName = 'events';
const collectionFields = {
  name: 'string|required',
  location: 'string|required',
  tickets: [
    {
      lote: 'integer|required',
      price: 'float|required',
      avaiable: 'integer|required'
    }
  ]
};

const dataExemple = {
  name: 'Lollapalooza',
  location: 'Indie Land',
  tickets: [
    {
      lote: '1',
      price: '600',
      avaiable: '600'
    },
    {
      lote: '2',
      price: '700',
      avaiable: '1000'
    }
  ]
};

// Collection register
hades.collections.new(collectionName, collectionFields);

// Validate a entry before register a new line collection
let validEntry = await hades.collections.events.validate(dataExemple);
```

## Tips:

You can import the data managing only (Collections), like in the exemple bellow:

```javascript
// const Hades = require('hades').Collections;
import { Collections } as Hades from 'hades'; // Collections data class

const database = new Hades();
```

Or only the pubsub class:

```javascript
// const Events = require('hades').Events;
import { Events } as Events from 'hades'; // Collections data class

const hades = new Events();

hades.on(eventName, handler);

hades.publish(eventName, handlerPayload);
```