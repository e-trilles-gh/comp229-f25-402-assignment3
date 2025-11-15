import mongoose from 'mongoose';

const qualificationSchema = new mongoose.Schema({
    title: String,
    firstname: String,
    lastname: String,
    email: String,
    completion: Date,
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export default mongoose.model('Qualification', qualificationSchema);