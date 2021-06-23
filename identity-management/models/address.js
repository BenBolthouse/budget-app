const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Address.init({
    userId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Model Validation: userId cannot be null or undefined',
        },
        isInt: {
          msg: 'Model Validation: Value for userId must be an integer',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Model Validation: name cannot be an empty string',
        },
        len: {
          args: [0, 32],
          msg: 'Model Validation: Value for name is too long',
        },
      },
    },
    lineOne: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Model Validation: lineOne cannot be null or undefined',
        },
        notEmpty: {
          msg: 'Model Validation: lineOne cannot be an empty string',
        },
        is: {
          args: /^([a-zA-Z0-9-.`'#& ]){1,128}$/,
          msg: 'Model Validation: Value for lineOne did not match regex',
        },
      },
    },
    lineTwo: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Model Validation: lineTwo cannot be an empty string',
        },
        is: {
          args: /^([a-zA-Z0-9-'.#& ]){1,128}$/,
          msg: 'Model Validation: Value for lineTwo did not match regex',
        },
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Model Validation: city cannot be null or undefined',
        },
        notEmpty: {
          msg: 'Model Validation: city cannot be an empty string',
        },
        is: {
          args: /^([a-zA-Z-& ]){1,64}$/,
          msg: 'Model Validation: Value for city did not match regex',
        },
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Model Validation: state cannot be null or undefined',
        },
        notEmpty: {
          msg: 'Model Validation: state cannot be an empty string',
        },
        is: {
          args: /^([A-Z]){2}$/,
          msg: 'Model Validation: Value for state did not match regex',
        },
      },
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Model Validation: zip cannot be null or undefined',
        },
        notEmpty: {
          msg: 'Model Validation: zip cannot be an empty string',
        },
        is: {
          args: /^([0-9]){5}$/,
          msg: 'Model Validation: Value for zip did not match regex',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};
