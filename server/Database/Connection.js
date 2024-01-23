import mongoose from "mongoose";

const dbConnection = async()=>{
    try{
        await mongoose.connect(process.env.URI);
        console.log("Database working");
    }catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected" , ()=>{
    console.log("Database not working");
})
mongoose.connection.on("connected", ()=>{
    console.log("Database Connected!")
})

export {dbConnection};


