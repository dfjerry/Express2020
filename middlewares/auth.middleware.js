var db = require('../db');

module.exports.requireAuth = function (req, res, next) {
    //check xem cookie co dc gui len ko
    if(!req.cookies.userId){//neu co cookie la userId thi cho qua, thuc te thi ko ai lam the nay, chi la demo hoat dong cookie
        res.redirect('/auth/login');//cho quay lai login
        return;//return ko thi no se chay login ben duoi
    }
    var user = db.get('users').find({id : req.cookies.userId}).value();//kiem tra trong db xem userId co = id ko
    if(!user){
        res.redirect('/auth/login');//cho quay lai login
        return;//return ko thi no se chay login ben duoi
    }
    //check het ma ok thi cho next
    next();
};

