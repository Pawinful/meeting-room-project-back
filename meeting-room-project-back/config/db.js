import mongoose from 'mongoose';

export const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB is connected ${connection.connection.host}`);
    } catch(error) {
        console.error(`Error : ${error.message}`);
        process.exit(1); //process code 1 means exit with failure, 0 means success
    }
}