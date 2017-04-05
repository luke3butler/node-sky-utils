"use strict";

// Function to assign defaults for missing values
// Overwrite arrays, merge objects, always favor obj
const setDefaults = (obj, defaults) => {
  for(var key in obj) {
    // If item is an object, create an array or object if it doesn't exist in the defaults
    if(typeof obj[key] == "object" && typeof defaults[key] !== "object") 
      defaults[key] = Array.isArray(obj[key]) ? [] : {};

    defaults[key] = (typeof obj[key] == "object" && !Array.isArray(obj[key])) ?
      // Recursively run for child for objects 
      setDefaults(obj[key], defaults[key]) :
      // Overwrite arrays, and all other data types
      defaults[key] = obj[key];
  }
  return defaults;
};

const isMacOS = () => "darwin" === process.platform;

module.exports = {
  setDefaults: setDefaults,
  isMacOS: isMacOS,
};