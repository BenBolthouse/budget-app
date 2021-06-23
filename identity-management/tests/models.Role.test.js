/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { before, afterEach } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { sequelize } = require('../models');
const { role } = require('../models');
const setup = require('./_setup');

const { expect } = chai;

chai.use(chaiAsPromised);

const queryInterface = sequelize.getQueryInterface();

before(async function () {
  this.timeout(10000);
  await setup();
});

describe('Unit Test: models.role', function () {
  afterEach(async function () {
    queryInterface.bulkDelete('roles', {});
  });

  context('#create(role)', function () {
    it('Creates a new Role testRole that returns testRole', async function () {
      // Arrange / Act
      const testRole = await role.create({
        name: 'TEST_ROLE',
        description: 'This is a test role',
      });

      // Assert
      expect(testRole).to.deep.equal(testRole);
    });
  });

  context('#name', function () {
    it('Requires name to not be undefined, null or an empty string', async function () {
      // Arrange
      const errorMessage = 'Model Validation: name cannot be null, undefined or an empty string';
      const testRoleUndefinedName = {
        name: undefined,
      };
      const testRoleNullName = {
        name: null,
      };
      const testRoleEmptyStringName = {
        name: '',
      };

      // Act / Assert
      return Promise.all([
        expect(role.create(testRoleUndefinedName)).to.be.rejectedWith(errorMessage),
        expect(role.create(testRoleNullName)).to.be.rejectedWith(errorMessage),
        expect(role.create(testRoleEmptyStringName)).to.be.rejectedWith(errorMessage),
      ]);
    });

    it('Requires name to match /^([A-Z0-9_]){4,24}$/', function () {
      // Arrange
      const errorMessage = 'Model Validation: Value for name did not match regex';
      const testCollection = [];
      const nameValidTestCases = {
        'legal-chars-a': 'LOCAL_ADMIN',
        'legal-chars-b': 'LOCAL_ADMIN_2',
      };
      const nameInvalidTestCases = {
        'illegal-chars-a': 'local admin',
        'illegal-chars-b': 'local_admin',
        'illegal-chars-c': 'local-admin-2',
        'illegal-chars-d': 'local$admin$2',
        'too-long': 'LOCAL_LOCAL_LOCAL_LOCAL_LOCAL_ADMIN',
      };

      // Act
      Object.values(nameValidTestCases).forEach((testCase) => {
        const caseTestUser = { name: testCase };
        testCollection.push(expect(role.create(caseTestUser)).to.not.be.rejected);
      });
      Object.values(nameInvalidTestCases).forEach((testCase) => {
        const caseTestUser = { name: testCase };
        testCollection.push(expect(role.create(caseTestUser)).to.be.rejectedWith(errorMessage));
      });

      // Assert
      return Promise.all(testCollection);
    });
  });

  context('#description', function () {
    it('Allows description to be undefined or null but not an empty string', async function () {
      // Arrange
      const errorMessage = 'Model Validation: description cannot be an empty string';
      const testRoleUndefinedDescription = {
        name: 'LOCAL_ADMIN',
        description: undefined,
      };
      const testRoleNullDescription = {
        name: 'LOCAL_ADMIN',
        description: null,
      };
      const testRoleEmptyStringDescription = {
        name: 'LOCAL_ADMIN',
        description: '',
      };

      // Act / Assert
      return Promise.all([
        expect(role.create(testRoleUndefinedDescription)).to.not.be.rejected,
        expect(role.create(testRoleNullDescription)).to.not.be.rejected,
        expect(role.create(testRoleEmptyStringDescription)).to.be.rejectedWith(errorMessage),
      ]);
    });

    it('Requires description to be less than 128 characters', function () {
      // Arrange
      const errorMessage = 'Model Validation: Value for description is too long';
      const descriptionTooLongText = `Lorem ipsum dolor sit amet.
                                      Lorem ipsum dolor sit amet.
                                      Lorem ipsum dolor sit amet.
                                      Lorem ipsum dolor sit amet.
                                      Lorem ipsum dolor sit amet.`;
      const descriptionTooLongCase = {
        name: 'LOCAL_ADMIN',
        description: descriptionTooLongText,
      };

      // Act / Assert
      expect(role.create(descriptionTooLongCase)).to.be.rejectedWith(errorMessage);
    });
  });
});
