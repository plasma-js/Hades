const test = require('unit.js');
const HadesLib = require('../dist/index.min');
const Hades = HadesLib.default;
const Collection = HadesLib.Collection;

const database = new Hades();
const testFields = {
  name: 'string(test)',
  description: 'string|required'
};
const testValidData = {
  name: 'test',
  description: 'lorem impsun'
};
const testUnvalidNameData = {
  name: 'another',
  description: 'lorem impsun'
};
const testUnvalidDescriptionData = {
  name: 'test',
  description: ''
};

describe('Hades', function() {
  it('Starts without errors', function() {  
    test
      .if(database instanceof Hades)
  });

  it('Throw an error at try to create a new collection without the fields model', function() {
    test.exception(function() {
      test.assert.throws(database.collections.new('test'),  Error);
    });
  });

  it('Create a collection "test" with the testFields object', function() {
    test
      .if(database.collections.list.test)
      .when(database.collections.new('test', testFields))
  });

  describe('Instance collections', function() {

    it('Collections list shows the "test" collection instance', function() {
      test
        .if(database.collections.list['test'])
        .then(function() {
          test.if(database.collections.data['test'] instanceof Collection)
        });
    });

    describe('Collection "test" instance', function() {
      it('validation of "testValidData" return no errors', function() {
        test
          .promise
          .resolve(database.collections.test.validate(testValidData))
          .then(test.done)
          .catch(test.fail)
      });

      it('validation of "testUnvalidNameData" return error', function() {
        test
          .promise
          .resolve(database.collections.test.validate(testUnvalidNameData))
          .then(test.fail)
          .catch(test.done);
      });

      it('validation of "testUnvalidDescriptionData" return error', function() {
        test
          .promise
          .resolve(database.collections.test.validate(testUnvalidDescriptionData))
          .then(test.fail)
          .catch(test.done);
      });
    });
  });
});