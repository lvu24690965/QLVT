"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Property.belongsTo(models.PropertyType, {
        foreignKey: "propertyTypeId",
        targetKey: "id",
        as: "propertyType",
      });
      Property.belongsTo(models.User, {
        foreignKey: "postedBy",
        as: "rUser",
      });
      Property.hasOne(models.PropertyDepartment, {
        foreignKey: "propertyId",
        sourceKey: "id",
        as: "propertyDepartment",
      });
    }
  }
  Property.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      statusType: {
        type: DataTypes.ENUM,
        values: ["RECEIVE", "REPAIR", "RENTED"],
      },
      isAvalable: DataTypes.BOOLEAN,
      propertyTypeId: DataTypes.INTEGER,
      images: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("images");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(arrayImages) {
          return this.setDataValue("images", JSON.stringify(arrayImages));
        },
      },
      postedBy: DataTypes.INTEGER,
      dateBuy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Property",
    }
  );
  return Property;
};
