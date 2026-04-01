import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: String,
    price: Number
});

export default mongoose.model("Course", courseSchema);