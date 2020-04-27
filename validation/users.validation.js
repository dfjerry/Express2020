module.exports.postCreate = function (req, res, next) {
    var errors = [];
    if(req.body.name.length > 30){
        errors.push("Name is required!");
    }
    if(!req.body.phone){
        errors.push("Phone is required!");
    }
    if(errors.length){
        res.render('users/create', {
            errors: errors,
            values: req.body //values la nhung gi ma nguoi dung ghi vao input de hien thi nguoc lai
        });
        return;//tra ve va ko chay nhung cai ben duoi
    }
    next();
};