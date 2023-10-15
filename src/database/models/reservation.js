'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "users",
      });
      Reservation.belongsTo(models.Book, {
        foreignKey: "book_id",
        as: "books",
      });
    }
  }
  Reservation.init({
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    date_of_booking: DataTypes.DATE,
    date_of_delivery: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};