import express from "express";
import "dotenv/config";
import { dbConnection } from "./Database/Connection.js";
import cookieParser from 'cookie-parser';
import userRoutes from "./Routes/userRoutes.js";
import itemRoutes from "./Routes/itemRoutes.js";
import cors from "cors"
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use(cors(
    {
        origin : ['https://deploy-mern-1whq.vercel.app'],
        methods : ["POST", "GET"],
        credentials : true
    }
))

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

//     next();
// });

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/items", itemRoutes);

app.use((err, req, res, next) =>{
    let {status = 500, message = "Something went wrong"} = err;
    return res.status(status).json({message : message});
})

app.listen(process.env.PORT , ()=>{
    dbConnection();
    console.log("Backend Connected!");
});
