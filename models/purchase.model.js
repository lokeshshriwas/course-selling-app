import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema({
    courseId : {
        type: Schema.Types.ObjectId,
        ref: "course"
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
},{timestamps : true})


const purchaseModel = mongoose.model("purchase", purchaseSchema)

export default purchaseModel;