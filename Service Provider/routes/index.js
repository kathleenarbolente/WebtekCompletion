var express = require('express');
var router = express.Router();

	
/* GET home page. */
router.get('/', function(req, res, next) {
	var mysql      = require('mysql');  
	var connection = mysql.createConnection({  
	host     : 'localhost',  
	user     : 'root',  
	password : '',  
	database : 'salon',
	dateStrings:true 
	});  

	var session_spid = req.session.spid;
	var total_transaction =0;
	var total_booking = 0;
	var total_request =0;

	 


	connection.query('SELECT count(service_request.status) as "status" from service_request JOIN customer JOIN service_providers JOIN services ON request.hoid = home_owner.hoid AND request.spid = service_provider.spid AND services.servid = request.servid AND request.reqid = booking.reqid AND payment.bookid = booking.bookid  WHERE booking.status = "Done" AND service_provider.spid = ' + session_spid, function(err, rows, fields) {  
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		total_transaction = rows[0].status;
	  	} 
	}); 

	connection.query('SELECT count(service_request.status) as "status" from booking JOIN service_provider JOIN request on request.spid = service_provider.spid AND request.reqid = booking.reqid where booking.status = "Ongoing"AND booking.date_rendered IS NULL AND booking.time_rendered IS NULL AND service_provider.spid = ' + session_spid, function(err, rows, fields) {  
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		total_booking = rows[0].status;
	  	} 
	}); 

	connection.query('SELECT count(service_request.reqstatus) as "status" from service_provider JOIN request on request.spid = service_provider.spid  where request.reqstatus= "Pending" AND service_provider.spid = ' + session_spid, function(err, rows, fields) {  
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		total_request = rows[0].status;
	  	}
	  	res.render('index', { title: 'Home', 'total_transaction': total_transaction, 'total_booking': total_booking,  'total_request': total_request}); 
	}); 	
	
});


/* GET SEARCH page. */
router.get('/search', function(req, res) {
    var search = req.query.search;
	var val = req.query.val;
	var mysql      = require('mysql');  
	var connection = mysql.createConnection({  
	  host     : 'localhost',  
	  user     : 'root',  
	  password : '',  
	  database : 'salon',
	  dateStrings:true
	});  

	var hoList_search = [];
	    
      connection.query('SELECT * from home_owner where home_owner.last_name LIKE "%'+ search +'%" OR home_owner.first_name LIKE "%'+search+'%"', function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {

		  		ho_account = {
		  			'hoid':rows[i].hoid,
		  			'email':rows[i].email,
		  			'gender':rows[i].gender,
		  			'name':rows[i].first_name + " " + rows[i].last_name,
		  			'birthdate':rows[i].birthdate,
		  			'address':rows[i].address,
		  			'cp_no':rows[i].cp_no,
		  			'tel_no':rows[i].tel_no
		  		}
		  		hoList_search.push(ho_account);
	  		}
	  		res.render('search_ho', { title: 'Search', 'hoList_search': hoList_search, 'search': search});
	  		connection.end();
	  		} 
		}); 
	});


module.exports = router;
