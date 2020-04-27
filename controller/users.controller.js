var db = require('../db');//require db
var shortid = require('shortid');

module.exports.index = function (req, res) {//req: request, res: response
    res.render("users/index", {
        users: db.get('users').value()
    });
};

module.exports.search = function (req, res) {
    var q = req.query.q;
    var matchUsers = db.get('users').value().filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchUsers
    });
};

module.exports.create = function (req, res) {
    console.log(req.cookies);
    res.render('users/create');
};

module.exports.view = function (req, res) {
    var id = req.params.id; // dung param luu :id vao bien id nay`

    var user = db.get('users').find({id: id}).value();//key id va id con lai la bien luu o param
    //render
    res.render('users/view', {
        user: user
    })
};

module.exports.delete = function(req, res) {
    var id = req.params.id;
    db.get('users').remove({id: id}).write();
    res.redirect('/users');
};

module.exports.update = function(req, res) {
    var id = req.params.id;
    res.render("users/update", {
        id: id
    });
};

module.exports.postCreate = function (req, res) {

    req.body.id = shortid.generate();//thay id khi mình nhập vào qua thằng shortid nó sẽ generate id cho mình
    db.get('users').push(req.body).write();//chua co validate vi ng dung muon post gi len cung dc
    res.redirect('/users');//method để quay lại users
};
module.exports.postUpdate = function(req, res) {
    var id = req.body.id;
    var name = req.body.name;
    db.get("users")
        .find({ id: id })
        .assign({ name: name })
        .write();
    res.redirect("/users");
};
