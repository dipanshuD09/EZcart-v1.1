import { Console, error } from "console";
import { response } from "express";
import mongoose from "mongoose";

 const connectDB = async () => {
     try {
         const conn = await mongoose.connect(process.env.MONGO_URI);
         console.log(`Connection Succeeded: ${conn.connection.host}`);
     } catch (error) {
         console.log(`Error: ${error.message}`);
         process.exit(1);
     }
 };

// const connectDB = () => {
//   mongoose
//     .connect(process.env.MONGO_URI)
//     .then((response) => {
//       console.log(`Connection Succeeded: ${conn.connection.host}`);
//     })
//     .catch((error) => {
//       console.log(`Error: ${error.message}`);
//     });
// };

export default connectDB;
