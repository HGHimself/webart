export const objectMap = (object, callback) => Object.keys(object)
  .map((key, i) => callback(key, object[key], i));
