"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Avalable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Avalable.belongsTo(models.Property, {
        foreignKey: "propertyId",
        targetKey: "id",
        as: "property",
      });
      Avalable.belongsTo(models.Department, {
        foreignKey: "departmentId",
        targetKey: "id",
        as: "department",
      });
    }
  }
  Avalable.init(
    {
      propertyId: DataTypes.INTEGER,
      departmentId: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Avalable",
    }
  );
  return Avalable;
};
