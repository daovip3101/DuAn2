const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var user = require('./user.js')
var message = new Schema({
    owner: {
        type: user,
        required: true
    },
    content: {
        type: String
    },
    urlImage: {
        type: String
    },
    urlAudio: {
        type: String
    },
    createdDate: { type: Date, default: Date.now },
})

var conversationSchema = new Schema({
    participants: [{ userName: String }],
    listMSg: [message],
    name: {
        type: String
    },
    adminGroup: {
        type: user
    },
    imgUrlAvarta: {
        type: String
    },
    createdDate: { type: Date, default: Date.now },
})
const Conversation = mongoose.model('Conversation', conversationSchema);
autoIncrement.initialize(mongoose.connection);
conversationSchema.plugin(autoIncrement.plugin, { model: 'Conversation', field: 'conversationId' });

const Message = mongoose.model('Message', message);
autoIncrement.initialize(mongoose.connection);
message.plugin(autoIncrement.plugin, { model: 'message', field: 'messageId' });

module.exports = {
    Conversation
};