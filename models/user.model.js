import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email : {
        type: String,
        unique: true
    },
    password : {
        type: String,
        required : [true, "Password required"],
        minLenght: 6,
    },
    firstName : {
        type: String,
    },
    lastName : {
        type: String,
    },
    country : {
        type: String
    },
    state : {
        type: String
    }
},{timestamps : true})


const userModel = mongoose.model("user", userSchema)

export default userModel;