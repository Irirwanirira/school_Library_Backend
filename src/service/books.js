const { Book } = require('../../src/database/models');
const User = require('../../src/database/models/index');
const Reservation = require('../../src/database/models/index');

export const createBook = async (book) => {
    return Book.create(book);
};

export const findAllBooks = async() => {
    return Book.findAll();
}

export const userBook = async({option})=> {
        return Book.findAll({
            ...option
        })
}

export const findBookById = async (id)=>{
    return Book.findOne({
        where: {id}
    })
}

export const deleteBook = async (id)=> {
    Book.destroy({
        where:{id}
    })
}

export const booksWithUsers = async() => {
    Book.findAll({
        include: {
            model: User,
             through: {Reservation,
            where: {
                User_id: id
                }
            }
        }
    })
}