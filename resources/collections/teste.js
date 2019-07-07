const parseValues = (s) => {
  const rules = [];
  s.split('|').forEach((v) => {
    let arg = (v.split('(')[1]) ? v.split('(')[1].split(')')[0] : null;

    rules[(arg) ? v.split('(')[0] : v] = arg;
  });

  return rules;
}

const parser = (a) => {
  if (typeof a === "object" || typeof a === "array") {
    const Type = (typeof a === "object") ? Object : Array;
    
    Type.keys(a).forEach((v) => {
      if (typeof a[v] === "object" || typeof a[v] === "array") {
        let keyValue = a[v];
        let typeName = (Array.isArray(keyValue)) ? 'array' : 'object';
        let typeValue = (typeName === "array") ? 'of' : 'shape';
        
        a[v] = [];
        a[v][typeName] = null;
        a[v][typeValue] = parser(keyValue);
      } else {
        a[v] = parseValues(a[v]);
      }
    });
  }
  
  return a;
}

function yupParser(v) {
  let format = [];

  if (Array.isArray(v)) {
    format['array'] = null;
    format['of'] = parser(v);
  } else {
    format['object'] = null;
    format['shape'] = parser(v);
  }

  return format;
}

const yup = require('yup');

const fields = {
  image: {
    url: 'string|url|required',
    title: 'string|required'
  },
  description: 'string',
  authors: [
    {
      image: 'string|url|required',
      name: 'string|required'
    }
  ]
};


const mapSchema = (a, b) => {
  let schema = yup;

  Object.keys(a).forEach((v) => {
    let newLevel = false;

    if (v !== 'shape' || v !== 'of') {
      schema = schema[v].call(this, a[v]);
    } else {
      schema[v].call(this, this.mapLevel(a[v])) 
    }
  });
  
  return schema;
}

const model = yupParser(fields);

let model1 = [];

model1['object'] = null; // YUP
model1['shape'] = {}; // ENTRIES

model1['shape']['authors'] = yup; // new YUP
model1['shape']['description'] = yup; // new YUP
model1['shape']['image'] = yup; // new YUP

model1['shape']['authors'] (ARRAY) = model1['shape']['authors'].call(); // new YUP
model1['shape']['authors']['of'] = null;  // ENTRIES

model1['shape']['authors']['of'][0] = yup; // new YUP
model1['shape']['authors']['of'][0] (OBJECT) = model1['shape']['authors']['of'][0]['object'].call();
model1['shape']['authors']['of'][0] (SHAPE) = model1['shape']['authors']['of'][0]['shape'].call();


const schema = mapSchema(model);

  // ENTRIE
  if (newLevel) {
    level = {};
  }

  // NEW
  if (loop === 'object') {
    level = yup.object();
  }

  if (loop === 'array') {
    level = yup.array();
  }


  // ENTRIES
  if (loop === 'shape') {
    level = level.shape();
  }

  if (loop === 'of') {
    level = yup.of();
  }