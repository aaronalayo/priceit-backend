import mongoose, { DocumentDefinition, Error } from 'mongoose';
import User, { IUser } from '../models/userModel.js'

async function register(user: DocumentDefinition<IUser>) {
    
    const find_user_db = await User.findOne({
        user_name: user.user_name
    }) 

    let userDuplicate : boolean = false

    try {

        if(user.user_name !== find_user_db?.user_name) {
            await User.create(user)
            console.log(`Succesfully registered: ${user.user_name}`)
        } else {
            console.log('User already exists ...')
            userDuplicate = true
            return userDuplicate
        }

    } catch (error) {
        console.log('Error Registering: ' + error )
    }
}

async function login(user: DocumentDefinition<IUser>) {
    try {
        const findUser = await User.findOne({ user_name: user.user_name, password: user.password })

        if (!findUser) {
            throw new Error('User not found ...')
        } else {
            return findUser
        }

    } catch (error) {
        console.log('Login error. ' + error )
    }

}

export default { register, login }