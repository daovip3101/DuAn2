const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
User = require('./user.js')
var messageSchema = new Schema({
    owner: {
        type: User,
        required: true
    },
    content: {
        type: String
    },
    imgImage: {
        type: String
    },
    imgAudio: {
        type: String
    },
    createdDate: { type: Date, default: Date.now },
})
const Messages = mongoose.model('Messages', messageSchema);
autoIncrement.initialize(mongoose.connection);
messageSchema.plugin(autoIncrement.plugin, { model: 'Messages', field: 'messsagesId' });

module.exports = {
    Messages
};