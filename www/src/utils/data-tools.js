export const objectMap = (object, callback) =>
  Object.keys(object).map((key, i) => callback(key, object[key], i));

export const arrayTake = (array, i) => array[i % array.length];

export const zip = (a, b) => a.map((k, i) => [k, b[i]]);
