import mongoose from "mongoose";

// create Schema for user Data.
const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required: true
    },
    lname:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
})


// we have export our useSchema using model.
// model take to argument in the brackets first is the collection name and second is your schema name.
export default mongoose.model("User",userSchema);