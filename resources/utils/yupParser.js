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

export default function yupParser(v) {
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