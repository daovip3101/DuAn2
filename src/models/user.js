const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type:String,
        required:true
    }
    ,
    imgUrl: {
        type: String,
    },
    listFriends :[]
})

const User = mongoose.model('User', userSchema);
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userId' });

module.exports = {
    User
};