var mongoose = require('mongoose');
const mlabURI = 'mongodb://daovip98:dao0903484902@ds261114.mlab.com:61114/chatapp'
//nhớ vào database add user vào mới connect được
const dbName = 'chatapp';

const con = mongoose.connect(mlabURI, (error) => {
	if(error){
		console.log("Error " + error);
	}else{
		console.log("Connected successfully to server")
	}
});

module.exports = con;
