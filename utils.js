'use strict';
const os = require('os');

// -- Data type analysis

// Returns the parameter's class
// https://bonsaiden.github.io/JavaScript-Garden/#types
const classType = item => Object.prototype.toString.call(item).slice(8, -1);

// - boolean responses

// Returns whether typeof === 'object'
const typeofObject = item => item !== null && typeof item === 'object';

// Check the class of an item
const classIs = (type, item) => notNull(item) && classType(item) === type;

// Returns true for arrays, but not objects
const isArray = item => Array.isArray(item);

// Returns true for objects, but not arrays
const isObject = item => classIs('Object', item);

// Returns true if defined and not null
const notNull = item => item !== undefined && item !== null;


// -- System functions

// Check if the current operating system matches the parameter
const osIs = type => type === process.platform;

// Returns true if node is running on macOS
const isMacOS = () => osIs('darwin');

// -- User info

// Return the current user
const currentUser = () => os.userInfo().username;

// Is the executing user root?
const isRoot = () => currentUser() === 'root';


// -- Object functions

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


// -- Export 

module.exports = {
  setDefaults,
  isMacOS,
  osIs,
  currentUser,
  isRoot,
  typeofObject,
  isArray,
  isObject,
  classType,
  classIs,
};