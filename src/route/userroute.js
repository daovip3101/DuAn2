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
    // get User By Id
    app.route('/getUserById/:id')
        .get(function (req, res) {
            var query = {
                _id: req.params.id
            };
            User.findById(query,
                (err, doc) => {
                    if (err) {
                        res.send("có lỗi " + err)
                    }
                    res.send(doc)
                }
            )
        });
    //thêm user
    app.route('/createUser')
        .post(function (req, res) {
            var user = new User({
                userName: req.body.userName,
                imgUrl: req.body.imgUrl,
                name: req.body.name
            })
            var firstTime = false;
            // kiểm tra xem user đã đăng nhập lần nào chưa?
            User.find({
                userName: user.userName
            }).exec(function (e, raw) {
                if (e) {
                    console.log("có lỗi")
                    //res.send(e)
                }
                if (raw.length !== 0) {
                    res.send(raw)
                } else {
                    user.save().then((user) => {
                        res.send(user)
                    }, (e) => {
                        res.send("có lỗi " + e)
                    })
                }
            });



        });
    //update  name user
    app.route('/updateNameByUserName')
        .put(function (req, res) {
            var query = {
                userName: req.body.userName
            };
            User.findOneAndUpdate(query, {
                name: req.body.name,
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
    //update avatar user
    app.route('/updateAvatarByUserName')
        .put(function (req, res) {
            var query = {
                userName: req.body.userName
            };
            User.findOneAndUpdate(query, {
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
    // add friend
    app.route('/addFriendByUserName')
        .put(function (req, res) {
            var query = {
                userName: req.body.userName
            };
            var friend = {
                _id: req.body.idFriend,
                name: req.body.name,
                imgUrl: req.body.imgUrl
            }
            User.findOneAndUpdate(query,
                { $push: { listFriends: friend } },
                { new: true },//phải thêm ông nội này mới chạy đước nhá
                (e, raw) => {
                    if (e) {
                        res.status(400).send('Invalid user');
                        //res.send(e)
                    }
                    res.send(raw);
                })
        })
    // dell friend
    app.route('/delFriendByUserNameAndIdFriend')
        .put(function (req, res) {
            var query = {
                userName: req.body.userName
            };
            var friend = {
                _id: req.body.friendId
            }
            User.findOneAndUpdate(query,
                { $pull: { listFriends: friend } },
                { new: true },//phải thêm ông nội này mới chạy đước nhá
                (e, raw) => {
                    if (e) {
                        res.status(400).send('Invalid user');
                        //res.send(e)
                    }
                    res.send(raw);
                })
        })
    // search people 
    app.route('/searchPeople/:userName')
        .get(function (req, res) {
            User.find({
                userName: {
                    $ne: req.params.userName
                }
            }).exec(function (e, raw) {
                if (e) {
                    res.status(400).send('Invalid user');
                    //res.send(e)
                }
                res.send(raw);
            });
        });
}