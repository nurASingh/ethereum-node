var express = require('express');
var router = express.Router();

var myUsers = [{ name: 'Arun', password: 123456, accno: 'xxx-123-120' }, { name: 'Sanket', password: 123456, accno: 'YYY-321-654' }]
/* GET users listing. */
router.post('/', function (req, res, next) {
  var userid = req.body.user.name, password = req.body.user.password;
  console.log(userid + '===' + password);
  myUsers.forEach(function (user) {
    console.log(user + '===='+user.name == userid +"===="+ user.password == password)
    if (user.name == userid && user.password == password) {
      console.log('Logged in');
      res.send(user);
    };
  });
});

module.exports = router;
