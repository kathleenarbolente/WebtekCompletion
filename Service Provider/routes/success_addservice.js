var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');

//mysql
var mysql      = require('mysql');  
var connection = mysql.createConnection({  
  host     : 'localhost',  
  user     : 'root',  
  password : '',  
  database : 'salon',
  dateStrings:true 
});  


/* GET success_requesr page. */
router.get('/', function(req, res, next) {
	var service_name = req.query.service_name;
	var rate = req.query.rate;
  var session_spid = req.session.spid;
    console.log(service_name);
     console.log(rate);
     console.log(session_spid);


          connection.query('INSERT INTO services (service_name) VALUES ("' + service_name + '")', function(err, rows, fields) {  
          if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
            }

             connection.query('SELECT service_id from services where service_name = "' + service_name+ '"', function(err, rows, fields) {  
          if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
            }
            var servid = rows[0].servid;
            connection.query('INSERT INTO service (prices) VALUES (' + prices + ')' , function(err, rows, fields) {  
            if (err) {
             res.status(500).json({"status_code": 500,"status_message": "internal server error"});
           }  
         });
      });
              res.render('success_addservice', { title: 'Service Added Successfully'});
    }); 
        
      });      


module.exports = router;
