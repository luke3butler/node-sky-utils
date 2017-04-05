"use strict";

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
const typeofObject = item => item !== null && typeof item === "object";

// Returns true for arrays, but not objects
const isArray = item => Array.isArray(item);

// Returns true for objects, but not arrays
const isObject = item => typeofObject(item) && !isArray(item);

// Returns true if node is running on macOS
const isMacOS = () => "darwin" === process.platform;

module.exports = {
  setDefaults,
  isMacOS,
  typeofObject,
  isArray,
  isObject
};