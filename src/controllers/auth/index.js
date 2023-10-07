const bcrypt = require("bcryptjs");

const{findUserByEmail, createUser}= require("../../service/auth.service");
const { hashPassword, generateToken } = require("../../utils/auth");

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await findUserByEmail(email);

    try {
        if(!user){
            return res.status(404).send({message: "User not found. Please register"});
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).send({message: "Invalid password"});
        };

        const generatedToken = generateToken(user);
        return res.status(200).send({
            message: "User logged in successfully",
            token: generatedToken,
            user: user
        });

    } catch (error) {
        return res.status(500).send({message: error.message});
        
    }
}

export const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    try {
        const oldUser = findUserByEmail(email);
        if(oldUser) {
            return res.status(409).send({message: "User already exist. Please login"});
        };

        const hashedPassword = await hashPassword(password);
        const newUser = await createUser({email: email.toLowerCase(), password: hashedPassword, name });
        if(!newUser){
            return res.status(500).send({message:"Error creating user"});
        };

        const response = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        }

        const generatedToken = generateToken(newUser);
        return res.status(201).send({
            message: "User created successfully",
            token: generatedToken,
            user: response
        });

    } catch (error) {
        return res.status(500).send({message: error.message});
        
    }
}

