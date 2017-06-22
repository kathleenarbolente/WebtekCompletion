var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login_sp', { title: 'Login'});

});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home'});
});

router.post('/', function (req, res, next){
  var post = req.body;
  var data  = post.password;
  var crypto = require('crypto');
  var password = (crypto.createHash('md5').update(data).digest('hex'));
  var email  = post.email;

  console.log('/login: -------------- ' + email + ":" + password);

  var mysql      = require('mysql');  
  var connection = mysql.createConnection({  
    host     : 'localhost',  
    user     : 'root',  
    password : '',  
    database : 'salon',
    dateStrings:true 
  });  

  var spList = [];

  var session_spid = req.session.spid;

  connection.query('SELECT * FROM service_providers', function(err, rows, fields) {  
      if (err) {
        res.status(500).json({"status_code": 500,"status_message": "internal server error"});
      }
      spList = rows;
        if(spList.length > 0) {
        for (var i = 0; i < spList.length; i++) {
          if("samsonsean@gmail.com" == email &&  "9b938710211168f2902f9ed4357cd05c" == password) {
            req.session.spid = spList[i].spid;
              req.session.email = spList[i].email;
              req.session.name = spList[i].first_name + " " +  spList[i].last_name;
              req.session.birthdate = spList[i].birthdate;
              req.session.address = spList[i].address;
              req.session.cp_no = spList[i].cp_no;
              req.session.tel_no = spList[i].tel_no;
              res.redirect('/');
              console.log("");   
            }  
          }
        }
    });
});
module.exports = router;
