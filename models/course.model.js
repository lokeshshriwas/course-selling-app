import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String,
        trim: true
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    }
}, { timestamps: true });

const courseModel = mongoose.model("course", courseSchema);

export default courseModel;
