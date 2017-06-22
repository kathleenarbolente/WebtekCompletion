var express = require('express');
var router = express.Router();

/* GET request page. */
router.get('/', function(req, res, next) {
  //mysql
  var mysql      = require('mysql');  
  var connection = mysql.createConnection({  
  	host     : 'localhost',  
  	user     : 'root',  
  	password : '',  
  	database : 'salon',
  	dateStrings:true
  });  
  var ho_request_list = [];

  var session_spid = req.session.spid;

  connection.query('SELECT customers.last_name, customers.first_name, customers.address, customers.email, customers.mobile_number, request.startdate, request.starttime, services.servtype, request.reqstatus, request.reqid from request JOIN home_owner JOIN service_provider JOIN services ON request.hoid = home_owner.hoid AND request.spid = service_provider.spid AND services.servid = request.servid AND request.reqstatus = "Pending" AND service_provider.spid = ' + session_spid, function(err, rows, fields) {  
  	if (err) {
  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
  	} else {
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {
	  			// Create an object to save current row's data
	  			var ho_request = {
	  				'reqid':rows[i].reqid,
	  				'email':rows[i].email,
	  				'gender':rows[i].gender,
	  				'name':rows[i].first_name + " " + rows[i].last_name,
	  				'company_name':rows[i].company_name,
	  				'address':rows[i].address,
	  				'mobile_number':rows[i].mobile_number,
	  				'startdate':rows[i].startdate,
	  				'starttime':rows[i].starttime,
	  				'reqstatus':rows[i].reqstatus,
	  				'servtype':rows[i].servtype
	  			}
		  		// Add object into array
		  		ho_request_list.push(ho_request);
		  	}
		  	res.render('request_sp', { title: 'Request', 'ho_request_list' : ho_request_list });

		  } 
		});   
});


module.exports = router;
