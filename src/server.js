const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 5000;
//kết nối database mblab
const db = require('./dbUtil.js');
app.use(bodyParser.json())

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
//userRoute
var UserRoute=require('./route/userroute.js')
UserRoute(app)
//messageRoute
// var Messages=require('./route/messagesrout.js')
// Messages(app)
//conversationRout
var ConversationRoute = require('./route/conversationroute')
ConversationRoute(app)
app.get('/api', (req, res) => {
    res.send(`Listening on ${PORT}`);
})