/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { before, afterEach } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { sequelize, Claim } = require('../../models');
const { setup } = require('../_setup');

const { expect } = chai;

chai.use(chaiAsPromised);

const queryInterface = sequelize.getQueryInterface();

before(async function () {
  this.timeout(10000);
  await setup();
});

describe('Models Unit Test —> Claim', function () {
  afterEach(async function () {
    queryInterface.bulkDelete('Claims', {});
  });

  context('#create({ ... })', function () {
    it('Creates a new Role testClaim that returns testClaim', async function () {
      // Arrange / Act
      const testClaim = await Claim.create({
        name: 'TEST_CLAIM',
        description: 'This is a test claim',
      });

      // Assert
      expect(testClaim).to.deep.equal(testClaim);
    });
  });

  context('#create({ name, ... })', function () {
    it('Requires name to not be undefined, null or an empty string', async function () {
      // Arrange
      const errorMessage = 'Model Validation: name cannot be null, undefined or an empty string';
      const testClaimUndefinedName = {
        name: undefined,
      };
      const testClaimNullName = {
        name: null,
      };
      const testClaimEmptyStringName = {
        name: '',
      };

      // Act / Assert
      return Promise.all([
        expect(Claim.create(testClaimUndefinedName)).to.be.rejectedWith(errorMessage),
        expect(Claim.create(testClaimNullName)).to.be.rejectedWith(errorMessage),
        expect(Claim.create(testClaimEmptyStringName)).to.be.rejectedWith(errorMessage),
      ]);
    });

    it('Requires name to match /^([A-Z0-9_]){4,64}$/', function () {
      // Arrange
      const errorMessage = 'Model Validation: Value for name did not match regex';
      const testCollection = [];
      const nameValidTestCases = {
        'legal-chars-a': 'CAN_ACCESS_NUCLEAR_CODES',
        'legal-chars-b': 'CAN_ACCESS_NUCLEAR_CODES_2',
      };
      const nameInvalidTestCases = {
        'illegal-chars-a': 'access codes',
        'illegal-chars-b': 'access_codes',
        'illegal-chars-c': 'access-codes-2',
        'illegal-chars-d': 'access$codes$2',
        'too-short': 'GUY',
        'too-long': 'CODES_CODES_CODES_CODES_CODES_CODES_CODES_CODES_CODES_CODES_EVERYWHERE',
      };

      // Act
      Object.values(nameValidTestCases).forEach((testCase) => {
        const caseTestUser = { name: testCase };
        testCollection.push(expect(Claim.create(caseTestUser)).to.not.be.rejected);
      });
      Object.values(nameInvalidTestCases).forEach((testCase) => {
        const caseTestUser = { name: testCase };
        testCollection.push(expect(Claim.create(caseTestUser)).to.be.rejectedWith(errorMessage));
      });

      // Assert
      return Promise.all(testCollection);
    });
  });

  // context('#create({ description, ... })', function () {
  //   it('Allows description to be undefined or null but not an empty string', async function () {
  //     // Arrange
  //     const errorMessage = 'Model Validation: description cannot be an empty string';
  //     const testRoleUndefinedDescription = {
  //       name: 'LOCAL_ADMIN',
  //       description: undefined,
  //     };
  //     const testRoleNullDescription = {
  //       name: 'LOCAL_ADMIN',
  //       description: null,
  //     };
  //     const testRoleEmptyStringDescription = {
  //       name: 'LOCAL_ADMIN',
  //       description: '',
  //     };

  //     // Act / Assert
  //     return Promise.all([
  //       expect(Claim.create(testRoleUndefinedDescription)).to.not.be.rejected,
  //       expect(Claim.create(testRoleNullDescription)).to.not.be.rejected,
  //       expect(Claim.create(testRoleEmptyStringDescription)).to.be.rejectedWith(errorMessage),
  //     ]);
  //   });

  //   it('Requires description to be less than 128 characters', function () {
  //     // Arrange
  //     const errorMessage = 'Model Validation: Value for description is too long';
  //     const descriptionTooLongText = `Lorem ipsum dolor sit amet.
  //                                     Lorem ipsum dolor sit amet.
  //                                     Lorem ipsum dolor sit amet.
  //                                     Lorem ipsum dolor sit amet.
  //                                     Lorem ipsum dolor sit amet.`;
  //     const descriptionTooLongCase = {
  //       name: 'LOCAL_ADMIN',
  //       description: descriptionTooLongText,
  //     };

  //     // Act / Assert
  //     expect(Claim.create(descriptionTooLongCase)).to.be.rejectedWith(errorMessage);
  //   });
  // });
});
