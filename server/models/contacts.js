import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export default mongoose.model('Contact', contactSchema);