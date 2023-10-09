const { Book } = require('../../src/database/models/');

export const createBook = async (book) => {
    return Book.create(book);
};

export const findAllBooks = async() => {
    return Book.findAll();
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
