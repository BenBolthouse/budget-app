/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { before, afterEach } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { sequelize, User, Address } = require('../../models');
const { setup } = require('../setup');
const { generateTestQueueItems } = require('../test_queue');

const { expect } = chai;

chai.use(chaiAsPromised);

const queryInterface = sequelize.getQueryInterface();

before(async function () {
  this.timeout(10000);
  await setup();

  await User.create({
    firstName: 'John',
    lastName: 'Doe',
  });
});

describe('Models Unit Test —> Address', function () {
  afterEach(async function () {
    queryInterface.bulkDelete('Addresses', {});
  });

  context('#create({ ... })', function () {
    it('Creates a new Address that returns', async function () {
      // Arrange / Act
      const testAddress = await Address.create({
        userId: 1,
        name: 'My home address',
        lineOne: '5050 Main Square',
        lineTwo: 'Apartment #1234',
        city: 'Chicago',
        state: 'IL',
        zip: '60201',
      });

      // Assert
      expect(testAddress).to.deep.equal(testAddress);
    });
  });

  context('#create({ userId, ... })', function () {
    it('Requires userId to not be null or undefined', async function () {
      // Arrange
      const errorMessage = 'Model Validation: userId cannot be null or undefined';
      const invalidCases = [undefined, null];

      // Act
      const invalidQueueItems = generateTestQueueItems(
        (x) => ({
          userId: x,
          name: 'My home address',
          lineOne: '5050 Main Square',
          lineTwo: 'Apartment #1234',
          city: 'Chicago',
          state: 'IL',
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.rejectedWith(errorMessage),
        invalidCases,
      );

      // Act / Assert
      return Promise.all([
        ...invalidQueueItems,
      ]);
    });

    it('Requires userId to be an integer or a coerced integer string', function () {
      // Arrange
      const errorMessage = 'Model Validation: Value for userId must be an integer';
      const validCases = [1, '1'];
      const invalidCases = ['ASDF', true, '1.123', 1.123];

      // Act
      const validQueueItems = generateTestQueueItems(
        (x) => ({
          userId: x,
          name: 'My home address',
          lineOne: '5050 Main Square',
          lineTwo: 'Apartment #1234',
          city: 'Chicago',
          state: 'IL',
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.not.be.rejected,
        validCases,
      );

      const invalidQueueItems = generateTestQueueItems(
        (x) => ({
          userId: x,
          name: 'My home address',
          lineOne: '5050 Main Square',
          lineTwo: 'Apartment #1234',
          city: 'Chicago',
          state: 'IL',
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.be.rejectedWith(errorMessage),
        invalidCases,
      );

      // Assert
      return Promise.all([
        ...validQueueItems,
        ...invalidQueueItems,
      ]);
    });
  });

  context('#create({ name, ... })', function () {
    it('Allows name to be undefined or null but not an empty string', async function () {
      // Arrange
      const errorMessage = 'Model Validation: name cannot be an empty string';
      const validCases = [undefined, null];
      const invalidCases = [''];

      // Act
      const validQueueItems = generateTestQueueItems(
        (x) => ({
          userId: 1,
          name: x,
          lineOne: '5050 Main Square',
          lineTwo: 'Apartment #1234',
          city: 'Chicago',
          state: 'IL',
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.not.be.rejected,
        validCases,
      );

      const invalidQueueItems = generateTestQueueItems(
        (x) => ({
          userId: 1,
          name: x,
          lineOne: '5050 Main Square',
          lineTwo: 'Apartment #1234',
          city: 'Chicago',
          state: 'IL',
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.rejectedWith(errorMessage),
        invalidCases,
      );

      // Act / Assert
      return Promise.all([
        ...validQueueItems,
        ...invalidQueueItems,
      ]);
    });

    it('Requires name to be less than or equal to 32 characters', () => {
      // Arrange
      const errorMessage = 'Model Validation: Value for name is too long';
      const validCases = ['My home address', 'Whatever you do be the fun of it'];
      const invalidCases = ['Whatever you do be the best at it', 'Where I lay my head, eat my Cheerios and do my taxes'];

      // Act
      const validQueueItems = generateTestQueueItems(
        (x) => ({
          userId: 1,
          name: x,
          lineOne: '5050 Main Square',
          lineTwo: 'Apartment #1234',
          city: 'Chicago',
          state: 'IL',
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.not.be.rejected,
        validCases,
      );

      const invalidQueueItems = generateTestQueueItems(
        (x) => ({
          userId: 1,
          name: x,
          lineOne: '5050 Main Square',
          lineTwo: 'Apartment #1234',
          city: 'Chicago',
          state: 'IL',
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.rejectedWith(errorMessage),
        invalidCases,
      );

      // Act / Assert
      return Promise.all([
        ...validQueueItems,
        ...invalidQueueItems,
      ]);
    });
  });

  context('#create({ lineOne, ... })', function () {
    it('Requires lineOne to not be undefined, null or an empty string', async function () {
      // Arrange
      const errorMessages = [
        'Model Validation: lineOne cannot be null or undefined',
        'Model Validation: lineOne cannot be an empty string',
      ];
      const invalidCases = [undefined, null];

      // Act
      const invalidQueueItems = [
        ...generateTestQueueItems(
          (x) => ({
            userId: 1,
            name: 'My home address',
            lineOne: x,
            lineTwo: 'Apartment #1234',
            city: 'Chicago',
            state: 'IL',
            zip: '60201',
          }),
          (x) => expect(Address.create(x)).to.be.rejectedWith(errorMessages[0]),
          invalidCases,
        ),
        ...generateTestQueueItems(
          (x) => ({
            userId: 1,
            name: 'My home address',
            lineOne: x,
            lineTwo: 'Apartment #1234',
            city: 'Chicago',
            state: 'IL',
            zip: '60201',
          }),
          (x) => expect(Address.create(x)).to.be.rejectedWith(errorMessages[1]),
          [''],
        ),
      ];

      // Act / Assert
      return Promise.all([
        ...invalidQueueItems,
      ]);
    });

    it("Requires lineOne to match /^([a-zA-Z0-9-'.#& ]){1,128}$/", () => {
      // Arrange
      const errorMessage = 'Model Validation: Value for lineOne did not match regex';
      const validCases = [
        "2021 Hell's Highway St",
        '2022 Heavenly Heights Way #702',
        '2023 Big-Wave Beach Blvd',
        '2023 Indie Cruise Dr.',
        '2023 Biggy & Sway Lane',
      ];
      const invalidCases = [
        '10701 **** Tackle Bard Way',
        '10702 Wierd Mansion Wilderness ^ w ^',
        `12345678901234567890
        12345678901234567890
        12345678901234567890
        12345678901234567890
        12345678901234567890
        12345678901234567890
        123456789`,
      ];

      // Act
      const validQueueItems = generateTestQueueItems(
        (x) => ({
          userId: 1,
          name: 'My Crib',
          lineOne: x,
          lineTwo: 'Apartment #1234',
          city: 'Chicago',
          state: 'IL',
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.not.be.rejected,
        validCases,
      );

      const invalidQueueItems = generateTestQueueItems(
        (x) => ({
          userId: 1,
          name: 'My Crib',
          lineOne: x,
          lineTwo: 'Apartment #1234',
          city: 'Chicago',
          state: 'IL',
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.rejectedWith(errorMessage),
        invalidCases,
      );

      // Act / Assert
      return Promise.all([
        ...validQueueItems,
        ...invalidQueueItems,
      ]);
    });
  });

  context('#create({ lineTwo, ... })', function () {
    it('Allows lineTwo to be undefined or null but not an empty string', async function () {
      // Arrange
      const errorMessage = 'Model Validation: lineTwo cannot be an empty string';
      const validCases = [undefined, null];
      const invalidCases = [''];

      // Act
      const validQueueItems = generateTestQueueItems(
        (x) => ({
          userId: 1,
          name: 'My spot',
          lineOne: '5050 Main Square',
          lineTwo: x,
          city: 'Chicago',
          state: 'IL',
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.not.be.rejected,
        validCases,
      );

      const invalidQueueItems = generateTestQueueItems(
        (x) => ({
          userId: 1,
          name: 'My spot',
          lineOne: '5050 Main Square',
          lineTwo: x,
          city: 'Chicago',
          state: 'IL',
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.rejectedWith(errorMessage),
        invalidCases,
      );

      // Act / Assert
      return Promise.all([
        ...validQueueItems,
        ...invalidQueueItems,
      ]);
    });

    it("Requires lineTwo to match /^([a-zA-Z0-9-'.#& ]){1,128}$/", () => {
      // Arrange
      const errorMessage = 'Model Validation: Value for lineTwo did not match regex';
      const validCases = [
        'Apartment 34',
        'Apt #34',
        'Ste. 316',
        'Big-Wave Room',
        "Steve's Room",
        "Angie & Regina's Unit",
      ];
      const invalidCases = [
        '10701 *** Tackle Bard Way',
        '10702 Wierd Mansion Wilderness ^ w ^',
        `12345678901234567890
        12345678901234567890
        12345678901234567890
        12345678901234567890
        12345678901234567890
        12345678901234567890
        123456789`,
      ];

      // Act
      const validQueueItems = generateTestQueueItems(
        (x) => ({
          userId: 1,
          name: 'My home address',
          lineOne: '5050 Main Square',
          lineTwo: x,
          city: 'Chicago',
          state: 'IL',
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.not.be.rejected,
        validCases,
      );

      const invalidQueueItems = generateTestQueueItems(
        (x) => ({
          userId: 1,
          name: 'My home address',
          lineOne: '5050 Main Square',
          lineTwo: x,
          city: 'Chicago',
          state: 'IL',
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.rejectedWith(errorMessage),
        invalidCases,
      );

      // Act / Assert
      return Promise.all([
        ...validQueueItems,
        ...invalidQueueItems,
      ]);
    });
  });

  context('#create({ city, ... })', function () {
    it('Requires city to not be undefined, null or an empty string', async function () {
      // Arrange
      const errorMessages = [
        'Model Validation: city cannot be null or undefined',
        'Model Validation: city cannot be an empty string',
      ];
      const invalidCases = [undefined, null];

      // Act
      const invalidQueueItems = [
        ...generateTestQueueItems(
          (x) => ({
            userId: 1,
            name: 'My home address',
            lineOne: '5050 Main Square',
            lineTwo: 'Apartment #1234',
            city: x,
            state: 'IL',
            zip: '60201',
          }),
          (x) => expect(Address.create(x)).to.be.rejectedWith(errorMessages[0]),
          invalidCases,
        ),
        ...generateTestQueueItems(
          (x) => ({
            userId: 1,
            name: 'My home address',
            lineOne: '5050 Main Square',
            lineTwo: 'Apartment #1234',
            city: x,
            state: 'IL',
            zip: '60201',
          }),
          (x) => expect(Address.create(x)).to.be.rejectedWith(errorMessages[1]),
          [''],
        ),
      ];

      // Act / Assert
      return Promise.all([
        ...invalidQueueItems,
      ]);
    });

    it('Requires city to match /^([a-zA-Z-& ]){1,64}$/', () => {
      // Arrange
      const errorMessage = 'Model Validation: Value for city did not match regex';
      const validCases = [
        'Phoenix',
        'Anderson Heights',
        'Tilley-Kinslow',
        'Roundville & Square City',
      ];
      const invalidCases = [
        'Tucson 10',
        'Chicago Baby ^ w ^',
        `12345678901234567890
        12345678901234567890
        12345678901234567890
        12345`,
      ];

      // Act
      const validQueueItems = generateTestQueueItems(
        (x) => ({
          userId: 1,
          name: 'My home address',
          lineOne: '5050 Main Square',
          lineTwo: 'Apartment #1234',
          city: x,
          state: 'IL',
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.not.be.rejected,
        validCases,
      );

      const invalidQueueItems = generateTestQueueItems(
        (x) => ({
          userId: 1,
          name: 'My home address',
          lineOne: '5050 Main Square',
          lineTwo: 'Apartment #1234',
          city: x,
          state: 'IL',
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.rejectedWith(errorMessage),
        invalidCases,
      );

      // Act / Assert
      return Promise.all([
        ...validQueueItems,
        ...invalidQueueItems,
      ]);
    });
  });

  context('#create({ state, ... })', function () {
    it('Requires state to not be undefined, null or an empty string', async function () {
      // Arrange
      const errorMessages = [
        'Model Validation: state cannot be null or undefined',
        'Model Validation: state cannot be an empty string',
      ];
      const invalidCases = [undefined, null];

      // Act
      const invalidQueueItems = [
        ...generateTestQueueItems(
          (x) => ({
            userId: 1,
            name: 'My home address',
            lineOne: '5050 Main Square',
            lineTwo: 'Apartment #1234',
            city: 'Chicago',
            state: x,
            zip: '60201',
          }),
          (x) => expect(Address.create(x)).to.be.rejectedWith(errorMessages[0]),
          invalidCases,
        ),
        ...generateTestQueueItems(
          (x) => ({
            userId: 1,
            name: 'My home address',
            lineOne: '5050 Main Square',
            lineTwo: 'Apartment #1234',
            city: 'Chicago',
            state: x,
            zip: '60201',
          }),
          (x) => expect(Address.create(x)).to.be.rejectedWith(errorMessages[1]),
          [''],
        ),
      ];

      // Act / Assert
      return Promise.all([
        ...invalidQueueItems,
      ]);
    });

    it('Requires state to match /^([A-Z]){2}$/', () => {
      // Arrange
      const errorMessage = 'Model Validation: Value for state did not match regex';
      const validCases = [
        'IL',
      ];
      const invalidCases = [
        'Illinois',
        'A',
        'ABC',
      ];

      // Act
      const validQueueItems = generateTestQueueItems(
        (x) => ({
          userId: 1,
          name: 'My home address',
          lineOne: '5050 Main Square',
          lineTwo: 'Apartment #1234',
          city: 'Chicago',
          state: x,
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.not.be.rejected,
        validCases,
      );

      const invalidQueueItems = generateTestQueueItems(
        (x) => ({
          userId: 1,
          name: 'My home address',
          lineOne: '5050 Main Square',
          lineTwo: 'Apartment #1234',
          city: 'Chicago',
          state: x,
          zip: '60201',
        }),
        (x) => expect(Address.create(x)).to.be.rejectedWith(errorMessage),
        invalidCases,
      );

      // Act / Assert
      return Promise.all([
        ...validQueueItems,
        ...invalidQueueItems,
      ]);
    });
  });

  context('#create({ zip, ... })', function () {
    it('Requires zip to not be undefined, null or an empty string', async function () {
      // Arrange
      const errorMessages = [
        'Model Validation: zip cannot be null or undefined',
        'Model Validation: zip cannot be an empty string',
      ];
      const invalidCases = [undefined, null];

      // Act
      const invalidQueueItems = [
        ...generateTestQueueItems(
          (x) => ({
            userId: 1,
            name: 'My home address',
            lineOne: '5050 Main Square',
            lineTwo: 'Apartment #1234',
            city: 'Chicago',
            state: 'IL',
            zip: x,
          }),
          (x) => expect(Address.create(x)).to.be.rejectedWith(errorMessages[0]),
          invalidCases,
        ),
        ...generateTestQueueItems(
          (x) => ({
            userId: 1,
            name: 'My home address',
            lineOne: '5050 Main Square',
            lineTwo: 'Apartment #1234',
            city: 'Chicago',
            state: 'IL',
            zip: x,
          }),
          (x) => expect(Address.create(x)).to.be.rejectedWith(errorMessages[1]),
          [''],
        ),
      ];

      // Act / Assert
      return Promise.all([
        ...invalidQueueItems,
      ]);
    });

    it('Requires zip to match /^([0-9]){5}$/', () => {
      // Arrange
      const errorMessage = 'Model Validation: Value for zip did not match regex';
      const validCases = [
        '60601',
      ];
      const invalidCases = [
        '6060',
        '606016',
        '60 6016',
        '60601-6',
        'ABC',
      ];

      // Act
      const validQueueItems = generateTestQueueItems(
        (x) => ({
          userId: 1,
          name: 'My home address',
          lineOne: '5050 Main Square',
          lineTwo: 'Apartment #1234',
          city: 'Chicago',
          state: 'IL',
          zip: x,
        }),
        (x) => expect(Address.create(x)).to.not.be.rejected,
        validCases,
      );

      const invalidQueueItems = generateTestQueueItems(
        (x) => ({
          userId: 1,
          name: 'My home address',
          lineOne: '5050 Main Square',
          lineTwo: 'Apartment #1234',
          city: 'Chicago',
          state: 'IL',
          zip: x,
        }),
        (x) => expect(Address.create(x)).to.be.rejectedWith(errorMessage),
        invalidCases,
      );

      // Act / Assert
      return Promise.all([
        ...validQueueItems,
        ...invalidQueueItems,
      ]);
    });
  });
});
