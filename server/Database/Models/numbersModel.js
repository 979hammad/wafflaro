import mongoose from "mongoose";

const schemaName = new mongoose.Schema({
    whatsappNumber : {
        type : Number , 
        required : true ,
    },
    mobileNumber : {
        type : Number,
        required : true 
    }
    
} , {timestamps : true});

const setNumbers = new mongoose.model("numberModel" , schemaName);

export { setNumbers };