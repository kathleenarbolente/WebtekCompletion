var express = require('express');
var router = express.Router();

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
  var id = req.query.id;
  var val = req.query.val;

  if (val == "accept") {
      connection.query('UPDATE service_request SET status = "Accepted" where request_id= ' + id, function(err, rows, fields) {  
      if (err) {
        res.status(500).json({"status_code": 500,"status_message": "internal server error"});
          } 
       });  
       
      connection.query('INSERT INTO service_request (status) VALUES ("Ongoing", ' + id + ")", function(err, rows, fields) {  
      if (err) {
        res.status(500).json({"status_code": 500,"status_message": "internal server error"});
          } 
       });    

  } else if (val == "decline") {  
      connection.query('UPDATE service_request SET status = "Rejected" where request_id= ' + id, function(err, rows, fields) {  
      if (err) {
        res.status(500).json({"status_code": 500,"status_message": "internal server error"});
          } 
       });  
  }
  res.render('success_request', { title: 'Request Success'});
});


module.exports = router;
