import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
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


const adminModel = mongoose.model("admin", adminSchema)

export default adminModel;