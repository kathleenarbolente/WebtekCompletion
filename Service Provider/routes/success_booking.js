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
   var bookid = req.query.bookid;
   var val = req.query.val;

  var timeFinished = req.query.timeFinished;
  var dateFinished = req.query.dateFinished;
  var payment = req.query.payment;

  console.log(timeFinished);

    
  if (val == "accept") {
      connection.query('UPDATE service_request SET status = "Done" where request_id= ' + request_id, function(err, rows, fields) {  
      if (err) {
        res.status(500).json({"status_code": 500,"status_message": "internal server error"});
          } 
       });  
       
      connection.query('UPDATE service_request SET dateAvail ="' + dateAvail +'" where request_id= ' + request_id, function(err, rows, fields) {  
      if (err) {
      res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } 
      });    

      connection.query('UPDATE service_request SET date ="' + date +'" where request_id= ' + request_id, function(err, rows, fields) {  
      if (err) {
      res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } 
      });    
  
  } 

  res.render('success_booking', { title: 'Done Booking'});
});


module.exports = router;
