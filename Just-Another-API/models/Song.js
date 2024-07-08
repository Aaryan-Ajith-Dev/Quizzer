import mongoose from "mongoose";

const SongSchema = mongoose.Schema({
    name: { type: String, unique: true, required: true },
    picture: String,
    audio: { type: String, required: true }
})

const Song = mongoose.model('Songs', SongSchema);
export default Song;