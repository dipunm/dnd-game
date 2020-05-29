import mongoose from 'mongoose';

// This will prevent the warnings.
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const uri: string = process.env.MONGODB_URI || "mongodb://Test:iMc5Ln5P0xQS2OcOK@ds149433.mlab.com:49433/heroku_cfk6wf32";
mongoose.connect(uri, err => {
    if (err) {
        console.log("Mongo Error:" + err.message);
    }
    else
    {
        console.log("Successfully connected to the database.");
    }
});

// Set up database variables
const chatMsgSchema = new mongoose.Schema({
    handle: String,
    message: String
});
type MessageDoc = Message & mongoose.Document;
export const ChatMsg = mongoose.model<MessageDoc>('ChatMsg', chatMsgSchema);