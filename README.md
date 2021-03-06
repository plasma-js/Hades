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
      lote: 1,
      price: 600.00,
      avaiable: 600
    },
    {
      lote: 2,
      price: 700.00,
      avaiable: 1000
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
// const Collections = require('hades').Collections;
import { Collections } from 'hades'; // Collections data class
```

Or only the pubsub class:

```javascript
// const Events = require('hades').Events;
import { Events } from 'hades'; // Events data class
```
