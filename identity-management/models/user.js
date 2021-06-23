const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Model Validation: firstName cannot be null, undefined or an empty string',
        },
        notNull: {
          msg: 'Model Validation: firstName cannot be null, undefined or an empty string',
        },
        is: {
          args: /^([a-zA-Z`'-]){2,24}$/,
          msg: 'Model Validation: Value for firstName did not match regex',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Model Validation: lastName cannot be null, undefined or an empty string',
        },
        notNull: {
          msg: 'Model Validation: lastName cannot be null, undefined or an empty string',
        },
        is: {
          args: /^([a-zA-Z`'-]){2,24}$/,
          msg: 'Model Validation: Value for lastName did not match regex',
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Model Validation: username cannot be an empty string',
        },
        is: {
          args: /^([a-zA-Z0-9-_@.]){4,24}$/,
          msg: 'Model Validation: Value for username did not match regex',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
