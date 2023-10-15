'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      book_cover_images: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      publisher: {
        type: Sequelize.STRING
      },
      date_of_publication: {
        type: Sequelize.DATE
      },
      pages: {
        type: Sequelize.INTEGER
      },
      language: {
        type: Sequelize.STRING
      },
      isbn: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};