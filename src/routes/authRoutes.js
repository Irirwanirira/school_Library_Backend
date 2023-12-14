const { Router } = require('express');
const { registerUser, loginUser, logoutUser, findAllUsers, getUserById, userAddBook, userGetBook, userGetBookById } = require('../controllers/auth_controller');

const router = Router()
    .post('/register', registerUser)
    .post('/login', loginUser)
    .get('/logout', logoutUser)
    .get('/users', findAllUsers)
    .get('/users/:id', getUserById)
    .post('/users/:id/books', userAddBook)
    .get('/users/:id/books', userGetBook)
    .get('/users/:id/books/:bookId', userGetBookById)
module.exports = router;
