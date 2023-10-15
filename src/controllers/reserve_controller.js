import reservation from '../database/models/reservation';

const {createReservation, findAllReservations} = require('../service/reservation');


export const postReservation =  async (req, res) => {
    const {userId, bookId, date_of_booking, date_of_delivery } = req.body
    try {
        const reserve = await createReservation({
            User_id:userId,
            book_id:bookId,
            date_of_booking,
            date_of_delivery
        });

        return res.status(200).send({
            message: "You have successfully reserved your book",
            reserve
        })
        
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

export const getAllReservations = async (req, res) => {
    try {
        const reservations = await findAllReservations();
        return res.status(200).send({
            message: "All reservations",
            reservations
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

export const deleteReservation = async (req, res) => {
    try {
        const remove = await deleteReservation();
        return res.status(201).send({
            message: "reservation deleted",
            remove
        })
    } catch (error) {
        
    }
}
