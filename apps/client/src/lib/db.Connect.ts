// import mongoose from "mongoose";

// let alreadyConnected = false;

// export const connectToDatabase = async () => {
//   try {
//     if (alreadyConnected) {
//       console.log("Already connected to the database");
//       return;
//     }

//     console.log("here")
//     // Connect to MongoDB
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     // Connection successful
//     console.log("Connected to the database");

//     // Optional: Add event listeners for connection events
//     mongoose.connection.on('error', (err) => {
//       console.error(`MongoDB connection error: ${err}`);
//     });

//     mongoose.connection.on('disconnected', () => {
//       console.log("MongoDB disconnected");
//     });

//     // Set the flag to indicate that the connection has been established
//     alreadyConnected = true;
//   } catch (error) {
//     console.error(`Error connecting to the database`);
//     // Handle the error appropriately
//   }
// };


