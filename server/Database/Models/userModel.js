import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
      type : String,
      required : true,
      min : 3 ,
      max : 20
    },
    email : {
        type : String,
        required: true,
        unique : true
    },
    pNumber : {
        type : Number,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        min : 5
    },
    role : {
        type : String,
        default : "user"
    }
},{ timestamps: true });

const User = new mongoose.model("User", userSchema);

export {User};
