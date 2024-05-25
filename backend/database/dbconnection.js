import mongoose from 'mongoose';

const MONGO_URL = 'mongodb+srv://parmaranand328:1XMrN1vnIo8dsEvN@cluster0.irv5j03.mongodb.net/JobPortal';

const dbConnection = () => {
    mongoose.connect(MONGO_URL)
        .then(() => {
            console.log('MongoDB connected successfully');
        })
        .catch(error => {
            console.error('Error connecting to MongoDB:', error);
        });
};

export { dbConnection };
