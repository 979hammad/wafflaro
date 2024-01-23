import express from "express";
import "dotenv/config";
import { dbConnection } from "./Database/Connection.js";
import cookieParser from 'cookie-parser';
import userRoutes from "./Routes/userRoutes.js";
import itemRoutes from "./Routes/itemRoutes.js";
 import cors from "cors";

const PORT = process.env.PORT || 8082;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Use cors middleware before defining routes
app.use(cors(
    {
        origin : ['http://localhost:5173/'],
        methods : ["POST", "GET"],
        credentials : true
    }
))

// Set headers in response to handle CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

//   next();
// });

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/items", itemRoutes);

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  return res.status(status).json({ message: message });
});

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server is running on port ${PORT}`);
});
