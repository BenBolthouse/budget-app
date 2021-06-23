/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { before, afterEach } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { sequelize, User } = require('../../models');
const { setup } = require('../_setup');

const { expect } = chai;

chai.use(chaiAsPromised);

const queryInterface = sequelize.getQueryInterface();

before(async function () {
  this.timeout(10000);
  await setup();
});

describe('Models Unit Test —> User', function () {
  afterEach(async function () {
    queryInterface.bulkDelete('Users', {});
  });

  context('#create({ ... })', function () {
    it('Creates a new User testUser that returns testUser', async function () {
      // Arrange / Act
      const testUser = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        username: 'jdoe',
      });

      // Assert
      expect(testUser).to.deep.equal(testUser);
    });
  });

  context('#create({ firstName, ... })', function () {
    it('Requires firstName to not be undefined, null or an empty string', async function () {
      // Arrange
      const errorMessage = 'Model Validation: firstName cannot be null, undefined or an empty string';
      const testUserUndefinedFirstName = {
        firstName: undefined,
        lastName: 'Doe',
        username: 'jdoe',
      };
      const testUserNullFirstName = {
        firstName: null,
        lastName: 'Doe',
        username: 'jdoe',
      };
      const testUserEmptyStringFirstName = {
        firstName: '',
        lastName: 'Doe',
        username: 'jdoe',
      };

      // Act / Assert
      return Promise.all([
        expect(User.create(testUserUndefinedFirstName)).to.be.rejectedWith(errorMessage),
        expect(User.create(testUserNullFirstName)).to.be.rejectedWith(errorMessage),
        expect(User.create(testUserEmptyStringFirstName)).to.be.rejectedWith(errorMessage),
      ]);
    });

    it("Requires firstName to match /^([a-zA-Z`'-]){2,24}$/", function () {
      // Arrange
      const errorMessage = 'Model Validation: Value for firstName did not match regex';
      const testCollection = [];
      const firstNameValidTestCases = {
        'legal-chars-a': 'Johnny-Boy',
        'legal-chars-b': 'O`John',
        'legal-chars-c': "O'John",
      };
      const firstNameInvalidTestCases = {
        'illegal-chars-a': 'Johnny Boy',
        'illegal-chars-b': 'O_John',
        'illegal-chars-c': 'O$John',
        'illegal-chars-d': 'O7John',
        'too-short': 'J',
        'too-long': 'JohnJohnJohnJohnJohnJohnJohn',
      };

      // Act
      Object.values(firstNameValidTestCases).forEach((testCase, i) => {
        const caseTestUser = {
          firstName: testCase,
          lastName: 'Doe',
          username: `jdoe1${i}`,
        };
        testCollection.push(expect(User.create(caseTestUser)).to.not.be.rejected);
      });
      Object.values(firstNameInvalidTestCases).forEach((testCase, i) => {
        const caseTestUser = {
          firstName: testCase,
          lastName: 'Doe',
          username: `jdoe2${i}`,
        };
        testCollection.push(expect(User.create(caseTestUser)).to.be.rejectedWith(errorMessage));
      });

      // Assert
      return Promise.all(testCollection);
    });
  });

  context('#create({ lastName, ... })', function () {
    it('Requires lastName to not be undefined, null or an empty string', async function () {
      // Arrange
      const errorMessage = 'Model Validation: lastName cannot be null, undefined or an empty string';
      const testUserUndefinedLastName = {
        firstName: 'John',
        lastName: undefined,
        username: 'jdoe',
      };
      const testUserNullLastName = {
        firstName: 'John',
        lastName: null,
        username: 'jdoe',
      };
      const testUserEmptyStringLastName = {
        firstName: 'John',
        lastName: '',
        username: 'jdoe',
      };

      // Act / Assert
      return Promise.all([
        expect(User.create(testUserUndefinedLastName)).to.be.rejectedWith(errorMessage),
        expect(User.create(testUserNullLastName)).to.be.rejectedWith(errorMessage),
        expect(User.create(testUserEmptyStringLastName)).to.be.rejectedWith(errorMessage),
      ]);
    });

    it("Requires lastName to match /^([a-zA-Z`'-]){2,24}$/", function () {
      // Arrange
      const errorMessage = 'Model Validation: Value for lastName did not match regex';
      const testCollection = [];
      const lastNameValidTestCases = {
        'legal-chars-a': 'Johnny-Boy',
        'legal-chars-b': 'O`John',
        'legal-chars-c': "O'John",
      };
      const lastNameInvalidTestCases = {
        'illegal-chars-a': 'Johnny Boy',
        'illegal-chars-b': 'O_John',
        'illegal-chars-c': 'O$John',
        'illegal-chars-d': 'O7John',
        'too-short': 'J',
        'too-long': 'JohnJohnJohnJohnJohnJohnJohn',
      };

      // Act
      Object.values(lastNameValidTestCases).forEach((testCase, i) => {
        const caseTestUser = {
          firstName: 'John',
          lastName: testCase,
          username: `jdoe1${i}`,
        };
        testCollection.push(expect(User.create(caseTestUser)).to.not.be.rejected);
      });
      Object.values(lastNameInvalidTestCases).forEach((testCase, i) => {
        const caseTestUser = {
          firstName: 'John',
          lastName: testCase,
          username: `jdoe2${i}`,
        };
        testCollection.push(expect(User.create(caseTestUser)).to.be.rejectedWith(errorMessage));
      });

      // Assert
      return Promise.all(testCollection);
    });
  });

  context('#create({ username, ... })', function () {
    it('Allows username to be undefined or null but not an empty string', async function () {
      // Arrange
      const errorMessage = 'Model Validation: username cannot be an empty string';
      const testUserUndefinedUsername = {
        firstName: 'John',
        lastName: 'Doe',
        username: undefined,
      };
      const testUserNullUsername = {
        firstName: 'John',
        lastName: 'Doe',
        username: null,
      };
      const testUserEmptyStringUsername = {
        firstName: 'John',
        lastName: 'Doe',
        username: '',
      };

      // Act / Assert
      return Promise.all([
        expect(User.create(testUserUndefinedUsername)).to.not.be.rejected,
        expect(User.create(testUserNullUsername)).to.not.be.rejected,
        expect(User.create(testUserEmptyStringUsername)).to.be.rejectedWith(errorMessage),
      ]);
    });

    it('Requires username to match /^([a-zA-Z0-9-_@.]){4,24}$/', function () {
      // Arrange
      const errorMessage = 'Model Validation: Value for username did not match regex';
      const testCollection = [];
      const lastNameValidTestCases = {
        'legal-chars-a': 'Johnny_Boi_454',
        'legal-chars-b': 'Johnny-Boi-454',
        'legal-chars-c': 'Johnny.Boi.454',
        'legal-chars-d': 'Johnny@Boi@454',
      };
      const lastNameInvalidTestCases = {
        'illegal-chars-a': 'Johnny Boy 454',
        'illegal-chars-b': 'Johnny$Boy$454',
        'illegal-chars-c': 'Johnny!Boy!454',
        'illegal-chars-d': 'Johnny=Boy=454',
        'too-short': 'Jny',
        'too-long': 'JohnJohnJohnJohnJohnJohnJohn',
      };

      // Act
      Object.values(lastNameValidTestCases).forEach((testCase) => {
        const caseTestUser = {
          firstName: 'John',
          lastName: 'Doe',
          username: testCase,
        };
        testCollection.push(expect(User.create(caseTestUser)).to.not.be.rejected);
      });
      Object.values(lastNameInvalidTestCases).forEach((testCase) => {
        const caseTestUser = {
          firstName: 'John',
          lastName: 'Doe',
          username: testCase,
        };
        testCollection.push(expect(User.create(caseTestUser)).to.be.rejectedWith(errorMessage));
      });

      // Assert
      return Promise.all(testCollection);
    });
  });
});
