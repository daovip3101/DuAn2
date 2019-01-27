const { User } = require('../models/user.js')
module.exports = function (app) {
    //xem uer
    app.route('/getAllUser')
        .get(function (req, res) {
            User.find().then((user) => {
                res.send({
                    user
                })
            }, (e) => {
                res.status(400).send(e);
            })
        });
    //thêm user
    app.route('/createUser')
        .post(function (req, res) {
            var user = new User({
                userName: req.body.userName,
                password: req.body.password,
                imgUrl: req.body.imgUrl
            })
            user.save().then((user) => {
                res.send(user)
            }, (e) => {
                res.send("có lỗi " + e)
            })
        });
    //update user
    app.route('/updateUserByUserName')
        .put(function (req, res) {
            var query = {
                userName: req.body.userName
            };
            User.findOneAndUpdate(query, {
                password: req.body.password,
                imgUrl: req.body.imgUrl
            },
                { new: true },
                (err, doc) => {
                    if (err) {
                        res.send("có lỗi khi update" + err)
                    }
                    res.send(doc)
                }
            )
        });
    //del user
    app.route('/delUserByUserName')
        .delete(function (req, res) {
            var query = {
                userName: req.body.userName
            };
            User.findOneAndRemove(query,
                (e, raw) => {
                    if (e) {
                        res.status(400).send('Invalid user');
                    }
                    res.send(raw);
                });
        });


}