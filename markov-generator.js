const MarkovGen = require('./markov');
const workerpool = require('workerpool');
const mongoose = require('mongoose');
const connectAndGetSchema = require('./mongo-connector');
require('dotenv').config();

const MessageSchema = connectAndGetSchema();
const Message = new mongoose.model('Message', MessageSchema);

async function markov(chatId, hint) {
    const messages = await Message.find({chatId});
    const input = messages.map(m => {
        return m.text;
    });
    const probabilityForFirstWord = false;
    let markov = new MarkovGen({
        input,
        minLength: 2,
        probabilityForFirstWord
    });
    const output = markov.makeChain(hint);
    return output;
}

workerpool.worker({
    markov
});
