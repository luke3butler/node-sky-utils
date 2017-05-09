"use strict";
// Testing utilities
const should = require('should');
const os = require('os');

// Items to test
const utils = require('../utils.js');


describe('data type analysis', () => {

  describe('#typeofObject(data)', () => {
    it('should return true for arrays and objects', () => {
      utils.typeofObject({})
        .should.be.true();
      utils.typeofObject([])
        .should.be.true();
    });
    it('should return false for non-object data types', () => {
      ["text",null,true,function(){}]
      .forEach(input => {
        utils.typeofObject(input).should.not.be.true();
      });
    })
  });

  describe('#isObject(data)', () => {
    it('should return true for objects', () => {
      utils.isObject({})
        .should.be.true();
      utils.isObject({test: false})
        .should.be.true();
    });
    it('should return false for arrays', () => {
      utils.isObject([])
        .should.not.be.true();
    });
    it('should return false for all other data types', () => {
      [ "text", false, null, function(){}]
      .forEach(input => {
        utils.typeofObject(input).should.not.be.true();
      });
    });
  });

    describe('#isArray(data)', () => {
    it('should return true for arrays', () => {
      utils.isArray([])
        .should.be.true();
      utils.isArray([false])
        .should.be.true();
    });
    it('should return false for objects', () => {
      utils.isArray({})
        .should.not.be.true();
    });
    it('should return false for all other data types', () => {
      [ "text", false, null, function(){}]
      .forEach(input => {
        utils.typeofObject(input).should.not.be.true();
      });
    });
  });

});

describe('object functions', () => {
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
      const overrides2 = {
        firstKey: { childKey2: { key: "value" } }
      };
      setDefaults(overrides, defaultSettings).firstKey.childKey2
        .should.equal(overrides.firstKey.childKey2);
      // Should not be an array
      setDefaults(overrides2, defaultSettings).firstKey.childKey2
        .should.not.be.Array();

    });
  });
});

describe('system functions', () => {
  
  describe('#osIs(type)', () => {
    it('should return true when passed the current OS as an argument', () => {
      utils.osIs(process.platform)
        .should.be.true();
    });
    it('should return false for other operating systems', () => {
      utils.osIs(process.platform === 'darwin' ? 'linux' : 'darwin')
        .should.be.false();
    });
  });
  
  describe('#isMacOS()', () => {
    it('should return true when process is running on darwin', () => {
      utils.isMacOS()
        .should.equal(process.platform === "darwin");
    });
  });

  describe('#isRoot()', () => {
    it(`should return false because the test runner does not run as root`, () => {
      utils.isRoot().should.equal(false);
    });
  });

  describe('#currentUser', () => {
    it(`should return the current running user`, () => {
      utils.currentUser().should.equal(os.userInfo().username);
    })
  });

});
