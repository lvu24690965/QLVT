"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyDepartment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association
      PropertyDepartment.belongsTo(models.Property, {
        foreignKey: "propertyId",
        targetKey: "id",
        as: "property",
      });
      PropertyDepartment.belongsTo(models.Department, {
        foreignKey: "departmentId",
        targetKey: "id",
        as: "departmentName",
      });
    }
  }
  PropertyDepartment.init(
    {
      propertyId: DataTypes.UUID,
      departmentId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "PropertyDepartment",
    }
  );
  return PropertyDepartment;
};
