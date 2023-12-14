const { Reservation } = require('../../src/database/models');

export const createReservation = async (reservation) => {
    return Reservation.create(reservation);
};

export const findAllReservations = async () => {
    return Reservation.findAll();
};

export const findReservationById = async (id) => {
    return Reservation.findOne({
        where: {id}
    })
};

export const deleteReservation = async (id) => {
    Reservation.destroy({
        where: {id}
    })
};

