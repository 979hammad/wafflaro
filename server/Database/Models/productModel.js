import mongoose from "mongoose";

const schemaName = new mongoose.Schema({
    itemName : {
        type : String , 
        required : true
    },
    description : {
        type : String , 
        required : true
    },
    price : {
        type : Number , 
        required : true ,
        maxLength : 7
    },
    ratings : {
        type : Number ,
        default : 0
    },
    itemImage : {
        path : String,
        filename : String
    },
    category : {
        type : String ,
        required : true
    },
    numOfReviews : {
        type : Number ,
        default : 0
    },
    reviews : [
        {   user : {
                type : mongoose.Schema.ObjectId,
                ref : "User",
                required: true
            },
            name : {
                type : String ,
                required : true
            },
            rating : {
                type : Number ,
                required : true ,
            },
            comment : {
                type : String ,
                required : true 
            }
        }
    ]
} , {timestamps : true});

const Item = new mongoose.model("Item" , schemaName);

export { Item };