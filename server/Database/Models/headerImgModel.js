import mongoose from "mongoose";

const schemaName = new mongoose.Schema({
    headerImage : {
        path : String,
        filename : String
    }
}, {timestamps : true})

const headerImg = new mongoose.model("headerImg", schemaName);

export {headerImg};
