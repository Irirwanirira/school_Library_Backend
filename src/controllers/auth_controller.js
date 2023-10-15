const {User} = require("../database/models")
// import {Book} from '../../database/models';
// import Reservation from '../../database/models';


// import { createBook, findAllBooks, findBookById, userBook } from '../../service/books';
// import { createReservation } from '../../service/reservation';

const bcrypt = require('bcryptjs');

const { findUserByEmail, createUser, getAllUsers, findUserById } = require('../service/auth.service');
const { hashPassword, generateToken } = require('../utils/auth');

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const oldUser = await findUserByEmail(email.toLowerCase());
    if (oldUser) {
      return res
        .status(409)
        .send({ message: 'User already exist. Please login' });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await createUser({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
    });
    if (!newUser) {
      return res.status(500).send({ message: 'Error creating user' });
    }
    const response = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
    const generatedToken = generateToken(newUser);
    return res.status(201).send({
      message: 'User created successfully',
      token: generatedToken,
      user: response,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  try {
    if (!user) {
      return res
        .status(404)
        .send({ message: 'User not found. Please register' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Invalid password' });
    }

    const generatedToken = generateToken(user);
    return res.status(200).send({
      message: 'User logged in successfully',
      token: generatedToken,
      user: user,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token');
    res.redirect('/');
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const findAllUsers = async(req, res) => {
  try {
    const users = await getAllUsers();
    return(res.status(200).json({message: "Users fetched successfully", users}))
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getUserById =async(req, res) => {
  try {
    const {id} = req.params

    const user = await findUserById(id)
    if(!user){
      return res.status(301).json({message: `User ${1} doesn't exist`})
    }
    return res.status(200).json({message: `User ${1}`, user})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const userAddBook = async (req, res) => {
  const {id} = req.params;
  const book = req.body;
  const author = await findUserById(id)
  if(!author){
    return res.status(404).json({ message: 'Author not found' });
  }

  try {
    
    const newBook = await createBook(book);
    const reservation = await createReservation({
      user_id: author.id,
      book_id: newBook.id
    });
    console.log(reservation);

    return res.status(201).json({message:"Books created successfully", book: newBook});
   
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
 
};

// export const userGetBook = async (req, res) =>{
//   const {id} = req.params;
//   try {
//     const author = await findUserById(id);
//     if(!author){
//       return res.status(404).json({ message: 'Author not found' });
//     }
//     const book = userBook({include: [{model:User, as:"reader", through: {model: Reservation}}]});
//     return res.status(201).json({message:"Books fetched successfully", book});
//   }
//   catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
  
// }

export const userGetBook = async (req, res) =>{
  const {id} = req.params;

  try {
    const author = await findUserById(id,  {
      include: {
        model: Book,
        as: 'books',
        through: {
          model: 'Reservation',
        },
      },
    });

    if(!author){
      return res.status(404).json({ message: 'Author not found' });
    }
    // console.log(author);
    const book = author.books
    return res.status(201).json({message:"Books fetched successfully", book});
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  
}

export const userGetBookById = async (req, res) =>{
  const {id} = req.params;
  const author = await findUserById(id)
  if(!author){
    return res.status(404).json({ message: 'Author not found' });
  }
  try {
    const {bookId} = req.params;
    const book = await findBookById(bookId);
    return res.status(201).json({message:"Books fetched successfully", book});
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  
}


  