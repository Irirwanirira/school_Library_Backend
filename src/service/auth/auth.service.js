const {User} = require("../../database/models")

export const findUserByEmail  = async (email) => {
    return User.findOne({
        where: {
            email,
        },
    });
}

export const findUserById = async(
    id,
    additionalCondition = {},
    options={}) => {
 return   User.findOne({
        where: {
         id,
         ...additionalCondition 
        }, 
        ...options
    })
};

export const createUser = async (user) => {
   return User.create(user)
};

export const getAllUsers = async() => {
   return User.findAll()
}

export const updateUser = async(id) => {
  return  User.update({
        Where: {
            id
        }
    })
};

export const deleteUsers = async(id) => { 
    return User.destroy({
        where: {
            id
        }
    })
}