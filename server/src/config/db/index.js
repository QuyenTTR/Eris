import mongoose from 'mongoose';

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/NCO_GRS');
        console.log('Database connected!');
        
    } catch (error) {
        console.log('Database connection error:', error.message);
    }
}

export default { connect };