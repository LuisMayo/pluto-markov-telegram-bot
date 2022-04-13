const MarkovGen = require('advanced-markov-generator');
const workerpool = require('workerpool');
const mongoose = require('mongoose');
const connectAndGetSchema = require('./mongo-connector');
require('dotenv').config();

const MessageSchema = connectAndGetSchema();
const Message = new mongoose.model('Message', MessageSchema);

async function markov(chatId) {
    const messages = await Message.find({chatId});
    const input = messages.map(m => {
        return m.text;
    });
    const probabilityForFirstWord = false;
    let markov = new MarkovGen({
        input,
        minLength: 1,
        probabilityForFirstWord
    });
    const output = markov.makeChain();
    return output;
}

workerpool.worker({
    markov
});
