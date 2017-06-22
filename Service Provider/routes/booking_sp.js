var express = require('express');
var router = express.Router();

//mysql



/* GET booking page. */
router.get('/', function(req, res, next) {

	var mysql      = require('mysql');  
	var connection = mysql.createConnection({  
	host     : 'localhost',  
	user     : 'root',  
	password : '',  
	database : 'salon',
	dateStrings:true
	});  

	 
	var ho_booking_list = [];

	 var session_spid = req.session.spid;

    connection.query('SELECT service_request.request_id, customers.last_name, customers.first_name, customers.address, customers.email, customers.mobile_number, service_request.date, service_request.time,service_request.dateAvail, service_request.serviceOffer,service_request.status from service_request JOIN customers JOIN service_providers JOIN services ON service_request.custom_id = customers.customer_id AND service_request.servce_id = service_providers.serv_id AND services.service_id = service_request.servce_id WHERE service_request.status = "Ongoing" AND service_providers.serv_id = ' + session_spid, function(err, rows, fields) {  
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {

	  			// Create an object to save current row's data
		  		var ho_booking = {
		  			'bookid': rows[i].bookid,
		  			'email':rows[i].email,
		  			'gender':rows[i].gender,
		  			'name':rows[i].first_name + " " + rows[i].last_name,
		  			'address':rows[i].address,
		  			'mobile_number':rows[i].mobile_number,
		  			'startdate':rows[i].startdate,
		  			'starttime':rows[i].starttime,
		  			'status':rows[i].status,
		  			'status':rows[i].status,
		  			'servtype':rows[i].servtype	
		  		}
		  		// Add object into array
		  		ho_booking_list.push(ho_booking);
	  		}
	  		res.render('booking_sp', { title: 'Booking', 'ho_booking_list' : ho_booking_list });
	  	} 
	});   
});

module.exports = router;
