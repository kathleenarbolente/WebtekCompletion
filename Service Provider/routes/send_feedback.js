var express = require('express');
var router = express.Router();
var dateTime = require('node-datetime');

//mysql



/* GET success_requesr page. */
router.get('/', function(req, res, next) {
	var dt = dateTime.create();
	var date = dt.format('Y-m-d');
	var time = dt.format('H:M:S');
	var hoid = req.query.hoid;
	var comment = req.query.comment;
	var val = req.query.val;
	var rating = req.query.rating;
	var session_spid = req.session.spid;
	req.session.ho_feedback = req.query.hoid;

	var mysql      = require('mysql');  
	var connection = mysql.createConnection({  
	host     : 'localhost',  
	user     : 'root',  
	password : '',  
	database : 'salon',
	dateStrings:true 
	}); 

      connection.query('INSERT INTO feedback (feedback.comments, feedback.rating, feedback.date, feedback.time) VALUES ("' + comment + '","' + rating + '","' + date + '","' + time + '")' , function(err, rows, fields) {  
      if (err) {
        res.status(500).json({"status_code": 500,"status_message": "internal server error"});
       }
       res.render('send_feedback', { title: 'Feedback Sent'});
       });    
  
});

module.exports = router;
