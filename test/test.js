"use strict";
// Testing utilities
const should = require('should');

// Items to test
const utils = require('../utils.js');


describe('Utils', () => {
  
  describe('#isMacOS()', () => {
    it('should return true when process is running on darwin', () => {
      utils.isMacOS()
        .should.equal(process.platform === "darwin");
    });
  });

  describe('#setDefaults(overrides, defaults)', () => {

    const setDefaults = utils.setDefaults;

    const defaultSettings = {
      firstKey: {
        childKey: true,
        childKey2: ["test", "array", "values"],
        childkey3: {
          test: true
        }
      },
      secondKey: true,
      thirdKey: false
    };

    it('should return default settings when given empty override object', () => {
      setDefaults({}, defaultSettings)
        .should.deepEqual(defaultSettings);
    });

    it('should include new keys', () => {
      const overrides = {
        newKey: "value", firstKey: {newKey: true}
      };
      const result = setDefaults(overrides, defaultSettings);
      result
        .should.have.property('newKey').and.equal("value");
      result.firstKey
        .should.not.deepEqual(overrides.firstKey)
        .and.have.property('newKey').and.equal(true);
    });

    it('should override values', () => {
      const overrides = { secondKey: ['arrayItem'] };
      setDefaults(overrides, defaultSettings).secondKey
        .should.equal(overrides.secondKey);
    });

    it('should deeply override objects', () => {
      const overrides = {
        firstKey: {
          childKey: { subChildKey: true }
        },
      };
      setDefaults(overrides, defaultSettings).firstKey.childKey
        .should.deepEqual(overrides.firstKey.childKey);
      
    });

    it('should overwrite arrays', () => {
      const overrides = {
        firstKey: { childKey2: ['newValue'] }
      };
      setDefaults(overrides, defaultSettings).firstKey.childKey2
        .should.equal(overrides.firstKey.childKey2);
    });

  });

});