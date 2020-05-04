var sgMail = require('@sendgrid/mail');
require('dotenv').config();//reqquire cang som cang tot de load file som
var db = require('../db');//require db
var md5 = require('md5');
module.exports.login = function (req, res) {//req: request, res: response
    res.render("auth/login");
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var msg = {
    to: 'tuanntth1906027@fpt.edu.vn',
    from: 'tuantuna955@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
module.exports.postLogin = function (req, res) {
    var email = req.body.email; // lay email o post request
    var password = req.body.password;
    // var count = 0;
    // for(var i = 0; i < email.length; i++){
    //     if(email[i] === '@'){
    //         count ++;
    //     }
    // }
    // if(count !== 1 ){
    //     res.render('auth/login', {//cho ng dung quay tro lai trang login
    //         errors: [
    //             'Email chỉ cần và chỉ có 1 ký tự @!!'//tao 1 obj errors de ti in ra loi
    //         ],
    //         values: req.body //de ng dung dien gi thi van luu o input
    //     });
    //     return;// return de dung lai
    // }
    var user = db.get('users').find({email: email}).value();//tim trong db co email trung voi email o tren no se ra value la 1 obj cua users do

    if(!user) {//neu ko tim thay trong db thi users ko ton tai
        res.render('auth/login', {//cho ng dung quay tro lai trang login
            errors: [
                'User does not exist!!'//tao 1 obj errors de ti in ra loi
            ],
            values: req.body //de ng dung dien gi thi van luu o input
        });
        return;// return de dung lai
    }
    //neu co user
    var hassedPassword = md5(password);
    if( user.password !== hassedPassword){
        res.render('auth/login', {
            errors: [
                'Wrong password!!'//tao 1 obj errors de ti in ra loi
            ],
            values: req.body //de ng dung dien gi thi van luu o input
        });
        sgMai.send(msg);
        return;
    }
    //trc khi redirect sang users thi set 1 cai cookie
    res.cookie('usersId', user.id, {
        singed: true
    });//set cookie name: usersId, value la user.id
    res.redirect('/users');
};

