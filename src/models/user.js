const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
var friend = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    imgUrl: {
        type: String,
    }
})
var userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
    },
    listFriends :[friend]
})

const User = mongoose.model('User', userSchema);
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userId' });

module.exports = {
    User
};