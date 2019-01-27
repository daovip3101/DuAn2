const { Messages } = require('../models/message.js')
module.exports = function (app) {
    //xem msg để test
    // app.route('/getAllMessage')
    //     .get(function (req, res) {
    //         Messages.find().then((msg) => {
    //             res.send({
    //                 msg
    //             })
    //         }, (e) => {
    //             res.status(400).send(e);
    //         })
    //     });
    //thêm msg
    // app.route('/createMessage')
    //     .post(function (req, res) {
    //         var msg = new Messages({
    //             owner: req.body.owner,
    //             content: req.body.content,
    //             imgImage: req.body.imgImage,
    //             imgAudio: req.body.imgAudio
    //         })
    //         msg.save().then((msg) => {
    //             res.send(msg)
    //         }, (e) => {
    //             res.send("có lỗi " + e)
    //         })
    //     });
    //del user
    // app.route('/delMsg')
    //     .delete(function (req, res) {
    //         var query = {
    //             userName: req.body.userName
    //         };
    //         User.findOneAndRemove(query,
    //             (e, raw) => {
    //                 if (e) {
    //                     res.status(400).send('Invalid user');
    //                 }
    //                 res.send(raw);
    //             });
    //     });


}