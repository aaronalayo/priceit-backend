import mongoose, { Document, Schema} from 'mongoose'


export interface IUser {
    user_name: string;
    first_name: string;
    last_name: string;
    email: string;
    password: String;
    repeat_password: String;
    // last_searched:Array<string>;
}


// const searchWords = new mongoose.Schema({
//     search_word: {
//         type: String
//     }
// })

export interface IUserModel extends IUser, Document {}

const UserSchema : Schema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    repeat_password: {
        type: String,
        required: true
    }
    // last_searches: {
    //     type: [searchWords],
    //     required: false
    // }
},
{
    versionKey: false
});

export default mongoose.model<IUserModel>('User', UserSchema);