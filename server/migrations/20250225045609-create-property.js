"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Properties", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      statusType: {
        type: Sequelize.ENUM(["RECEIVE", "REPAIR", "RENTED"]),
        defaultValue: "RECEIVE",
      },
      isAvalable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      propertyTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "PropertyTypes",
          key: "id",
        },
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      images: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      postedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      dateBuy: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Properties");
  },
};
