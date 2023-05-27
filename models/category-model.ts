import mongoose, { Schema } from "mongoose";



const categorySchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
    },
    isEditable: {
        type: Boolean,
        required: true,
        default: true,
    },
    color: {
        id: String,
        name: String,
        code: String,
    },
    icon: {
      id: String,
      name: String,
      symbol: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
});


const Category = mongoose.model("Category", categorySchema);

export default Category;