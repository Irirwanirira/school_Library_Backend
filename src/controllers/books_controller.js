const {createBook, findAllBooks, findBookById,  deleteBook} = require('../service/books');

export const createBookController = async (req, res) => {
    const book = req.body;
    const newBook = await createBook(book);
    return res.status(201).send({message:"Books created successfully"});
};

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