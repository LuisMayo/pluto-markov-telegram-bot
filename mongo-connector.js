const mongoose = require('mongoose');
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;

/**
 * Connects current thread to mongodb
 * @returns MongoDBSchema
 */
module.exports = () => {
    console.log("Okay, let's see what I've learnt...")
    mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: false, family: 4 })
        .then(() => console.log("Interesting..."))
        .catch((e) => {
            console.log("Whoops... Something went wrong");
            console.log(e);
        });
    const MessageSchema = new mongoose.Schema({
        text: String,
        chatId: Number
    });
    MessageSchema.plugin(mongooseFieldEncryption, { fields: ["text"], secret: process.env.ENCRYPT_KEY });
    return MessageSchema;
}
