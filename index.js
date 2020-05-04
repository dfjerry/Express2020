
//console.log(process.env.SESSION_SECRET);//env environment -- moi truong
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var userRoute = require('./routes/users.route');
var authRoute = require('./routes/auth.route');
var authMiddle = require('./middlewares/auth.middleware');
var port = 3000;
var app = express();
//set up pug
app.set('views', './views');
app.set('view engine', 'pug');
//body-parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));//truyen vao 1 cai secret -- sesion secret
// app.use(function (req, res, next) {
//     var cookie = req.cookies.count;
//     var count = parseInt(req.cookies.count);
//     if (cookie === undefined)
//     {
//         count = 1;
//     }
//     else {
//
//         count++;
//         res.cookie('count', count);
//     }
//     console.log(count);
//     next();
// });
app.get('/',authMiddle.requireAuth, function (req, res) {//req: request, res: response
    res.render('index');//truyen vao path den file template ma minh muon render tinh ke tu view nay
});

app.use('/users', authMiddle.requireAuth, userRoute);//truyen vao middleware de protec userRoute
app.use('/auth', authRoute);
app.use(express.static('public'));//luu cac file static o public thi co the truy cap vao lay ra dc


//ES6



app.listen(port, function () {
    console.log("Server listening on port " + port);
});




