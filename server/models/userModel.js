import mongoose from "mongoose";


const userSchema = new mongoose.Schema ({
        userName: {
            type: String,
            required: true,
            min: 3,
            max: 50,
            unique: true
        },
        email: {
            type: String,
            required: true, 
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 20
        },
        avatar: {
            type: String,
            default:"",
        },
        coverPicture: {
            type: String, 
            default: ""
        },
        followers: {
            type: Array,
            default: []
        },
        youFollow: {
            type: Array,
            default: []
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            max: 40
        },
        favCity : {
            type: String,
            max: 30
        }

    },
    { timestamps: true }
)



const User = mongoose.model('User', userSchema);
export default User


