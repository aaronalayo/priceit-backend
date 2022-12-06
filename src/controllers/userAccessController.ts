import { NextFunction, Request, Response } from 'express';
import userService from '../services/userAccessServices.js'

const loginOne = async (req: Request, res: Response) => {
    try {
        const find_user = await userService.login(req.body);
        
        if (find_user != null) {
            res.status(200).send(find_user);
        } else {
            console.log('USER.ACCESS.CONTROLLER: User not found ...')
            res.status(404).json({ message: "Incorrect username / password  ..." })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error Logging in ...'});
    }
}


const registerOne = async (req: Request, res: Response, next: NextFunction) => {

    const user_data = req.body

    try {
        if (user_data != null) {
            const userDuplicate = await userService.register(user_data);
            if (userDuplicate == true) {
                res.status(404).json({ message: `${user_data.user_name} already exists ...`});
            } else {
                res.status(200).json({ message: `Successfully registered ${user_data.user_name}`});
            }
        } else {
            res.status(404).send('Input error');
        }
        // return user_data
    } catch (error) {
        return res.status(500).json({ message: 'Error registering ...'})
    }
}

export default { loginOne, registerOne }