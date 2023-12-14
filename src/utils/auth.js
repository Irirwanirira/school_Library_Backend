const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const dotenv = require("dotenv");
// dotenv.config();

export const generateToken = (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            // role: user.role.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );
    return token;
};

export const hashPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =  bcrypt.hash(password, salt);
    return hashedPassword;
};

