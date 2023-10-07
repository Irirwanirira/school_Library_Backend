const {User} = require("../../src/database/models")

export const findUserByEmail  = async (email) => {
   
    return User.findOne({
        where: {
            email,
        },
    });
}

export const findUserById = async(id)=> {
 return   User.findOne({
        where: {
            id
        }
    })
};

export const createUser = async (user) => {
   return User.create(user)
};

export const updateUser = async(id) => {
  return  User.update({
        Where: {
            id
        }
    })
};