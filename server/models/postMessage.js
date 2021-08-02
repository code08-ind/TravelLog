import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    creadtedAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = new mongoose.model('PostMessage', postSchema);

export default PostMessage;
