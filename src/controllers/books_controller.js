const Book = require('../database/models/index')
const User = require('../database/models/index')
const Reservation = require('../database/models/index')


const {createBook, findAllBooks, findBookById,  deleteBook} = require('../service/books');

// export const createBookController = async (req, res) => {
//     const userId = req.params.userId;
//     const book = req.body;
//     const newBook = await createBook({...book, userId});
//     return res.status(201).send({message:"Books created successfully"});
// };

export const getAllBooks = async(req, res) => {
    const allBooks = await findAllBooks();
    res.status(200).send({
        message: "List of all books",
        books: allBooks
    })
};

export const getBookById = async (req, res) => {
    const singleBook = await findBookById();
    res.status(200).send({
        message: "singleBook",
        book: singleBook
    })
};

export const removeBook = async (req, res) => {
    const removed = await deleteBook();
    res.status({
        message: `${removed} was successfully deleted`,
    })
};

export const booksWithUsers = async() => {
    await Book.findAll({
        include: {
            model: User,
             through: {Reservation,
            where: {
                User_id:[1,2,3,4]
                }
            }
        }
    })
}
console.log(booksWithUsers());
