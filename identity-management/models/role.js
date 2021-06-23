const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Model Validation: name cannot be null, undefined or an empty string',
        },
        notNull: {
          msg: 'Model Validation: name cannot be null, undefined or an empty string',
        },
        is: {
          args: /^([A-Z0-9_]){4,64}$/,
          msg: 'Model Validation: Value for name did not match regex',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Model Validation: description cannot be an empty string',
        },
        len: {
          args: [0, 128],
          msg: 'Model Validation: Value for description is too long',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};
