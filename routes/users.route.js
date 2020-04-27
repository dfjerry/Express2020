var express = require('express');

var controller = require('../controller/users.controller');
var router = express.Router();//tao doi tuong router
var validationUsers = require('../validation/users.validation');



router.get('/', controller.index);//middle ware auth se dc chay trc khi vao index
router.get('/search', controller.search);
router.get('/cookie', function (req, res, next) {
    res.cookie('set-cookie', 12345);
    res.send('hello');
});
router.get('/create', controller.create);
//view
router.get('/:id', controller.view);
//delete
router.get("/:id/delete", controller.delete);
//update
router.get("/:id/update", controller.update);
//POST
router.post('/create',validationUsers.postCreate, controller.postCreate);
//update
router.post("/update", controller.postUpdate);

module.exports = router;