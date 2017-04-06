'use strict';

// Function to assign defaults for missing values
// Overwrite arrays, merge objects, always favor obj
const setDefaults = (obj, defaults) => {
  for(var key in obj) {
    // If item is an object, create an array or object if it doesn't exist in the defaults
    if(typeofObject(obj[key]) && !typeofObject(defaults[key]))
      defaults[key] = isArray(obj[key]) ? [] : {};

    defaults[key] = (isObject(obj[key]) && !isArray(defaults[key])) ?
      // Recursively run for child for objects 
      setDefaults(obj[key], defaults[key]) :
      // Overwrite arrays, and all other data types
      obj[key];
  }
  return defaults;
};

// Returns true for objects and arrays
const typeofObject = item => item !== null && typeof item === 'object';

// Returns true for arrays, but not objects
const isArray = item => Array.isArray(item);

// Returns true for objects, but not arrays
const isObject = item => classIs('Object', item);

// Returns true if node is running on macOS
const isMacOS = () => 'darwin' === process.platform;

// Returns true if defined and not null
const notEmpty = item => item !== undefined && item !== null;

// Returns the class - https://bonsaiden.github.io/JavaScript-Garden/#types
const classType = item => Object.prototype.toString.call(item).slice(8, -1);

// Check the class of an item
const classIs = (type, item) => notEmpty(item) && classType(item) === type;

module.exports = {
  setDefaults,
  isMacOS,
  typeofObject,
  isArray,
  isObject,
  classType,
  classIs,
};