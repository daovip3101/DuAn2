const { Conversation } = require('../models/conversation.js')
module.exports = function (app) {
    //xem conversation
    app.route('/getAllConversation')
        .get(function (req, res) {
            Conversation.find().then((conver) => {
                res.send({
                    conver
                })
            }, (e) => {
                res.status(400).send(e);
            })
        });
    //xem conversation with id
    app.route('/getConversationById/:convsersationId')
        .get(function (req, res) {
            var query = {
                _id: req.params.convsersationId
            };
            Conversation.findOne(query, function (err, con) {
                if (err) {
                    res.send("có lỗi" + err)
                }
                if (con) {
                    res.send(con)
                }
            });
        });
    //thêm conversation
    app.route('/createConversation')
        .post(function (req, res) {
            var conversation = new Conversation({
                participants: req.body.participants,
                listMSg: req.body.listMSg,
                name: req.body.name,
                adminGroup: req.body.adminGroup,
                imgUrlAvarta: req.body.imgUrlAvarta
            })
            conversation.save().then((conversation) => {
                res.send(conversation)
            }, (e) => {
                res.send("có lỗi " + e)
            })
        });
    //add msg  listMsg in conversation
    app.route('/addMsgInConversation')
        .put(function (req, res) {
            var msg = {
                owner: req.body.owner,
                content: req.body.content,
                urlImage: req.body.urlImage,
                urlAudio: req.body.urlAudio,
            };
            Conversation.findOneAndUpdate(
                { _id: req.body._idConverSation },
                { $push: { listMSg: msg } },
                { new: true },//phải thêm ông nội này mới chạy đước nhá
                (err, doc) => {
                    if (err) {
                        res.send("có lỗi khi update" + err)
                    }
                    res.send(doc)
                }
            )
        });
    //del msg  listMsg in conversation
    app.route('/delMsgInConversation')
        .put(function (req, res) {
            var msg = {
                _id: req.body._idMsg
            }
            Conversation.findOneAndUpdate(
                { _id: req.body._idConverSation },
                { $pull: { listMSg: msg } },
                { new: true },//phải thêm ông nội này mới chạy đước nhá
                (err, doc) => {
                    if (err) {
                        res.send("có lỗi khi update" + err)
                    }
                    res.send(doc)
                }
            )
        });
    //add  participants in conversation
    app.route('/addParticipant')
        .put(function (req, res) {
            var user = {
                userName: req.body.userName,
            };
            Conversation.findOneAndUpdate(
                { _id: req.body._idConverSation },
                { $push: { participants: user } },
                { new: true },//phải thêm ông nội này mới chạy đước nhá
                (err, doc) => {
                    if (err) {
                        res.send("có lỗi khi update" + err)
                    }
                    res.send(doc)
                }
            )
        });
    //del participant in conversation
    app.route('/delParticipants')
        .put(function (req, res) {
            var user = {
                userName: req.body.userName,
            };
            Conversation.findOneAndUpdate(
                { _id: req.body._idConverSation },
                { $pull: { participants: user } },
                { new: true },//phải thêm ông nội này mới chạy đước nhá
                (err, doc) => {
                    if (err) {
                        res.send("có lỗi khi update" + err)
                    }
                    res.send(doc)
                }
            )
        });
    //del conversation
    app.route('/delConversation')
        .delete(function (req, res) {
            var query = {
                _id: req.body._idConverSation
            };
            Conversation.findOneAndRemove(query,
                (e, raw) => {
                    if (e) {
                        res.status(400).send('Invalid user');
                    }
                    res.send(raw);
                });
        });


}