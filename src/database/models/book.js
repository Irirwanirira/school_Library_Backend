const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // Book.belongsToMany(models.User, {
      //   through: "Reservation",
      //   foreignKey: "bookId",
      //   otherKey: "userId",
      //   as: "reader",
      // });
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    bookCoverImages: DataTypes.STRING,
    genre: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    language: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};