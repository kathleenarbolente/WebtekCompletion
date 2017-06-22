var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');

/* GET SP's profile. */
router.get('/', function(req, res, next) {

	var mysql      = require('mysql');  
	var connection = mysql.createConnection({  
	  host     : 'localhost',  
	  user     : 'root',  
	  password : '',  
	  database : 'salon',
	  dateStrings:true 
	});  

	var spList = [];
	var feedbackList = [];
	var sp_account;
	var average_rating = 0;

	var session_spid = req.session.spid;

	connection.query('SELECT * FROM service_providers WHERE service_provider.serv_id = ' + session_spid, function(err, rows, fields) {  
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {
		  		sp_account = {
		  			'spid':rows[i].spid,
		  			'email':rows[i].email,
		  			'gender':rows[i].gender,
		  			'name':rows[i].first_name + " " + rows[i].last_name,
		  			'company_name':rows[i].company_name,
		  			'birthdate':rows[i].birthdate,
		  			'address':rows[i].address,
		  			'cp_no':rows[i].cp_no,
		  			'tel_no':rows[i].tel_no
		  		}
	  		}
	  	} 
	});

		connection.query('SELECT * FROM services JOIN sp_service JOIN service_provider ON services.servid = sp_service.servid AND service_provider.spid = sp_service.spid AND service_provider.spid = ' + session_spid, function(err, rows, fields) {  
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {


		  		var sp = {
		  			'spid':rows[i].spid,
		  			'email':rows[i].email,
		  			'gender':rows[i].gender,
		  			'name':rows[i].first_name + " " + rows[i].last_name,
		  			'company_name':rows[i].company_name,
		  			'birthdate':rows[i].birthdate,
		  			'address':rows[i].address,
		  			'cp_no':rows[i].cp_no,
		  			'servtype':rows[i].servtype,
		  			'tel_no':rows[i].tel_no,
		  			'hourly_rate' : rows[i].hourly_rate,
		  			'servid' :rows[i].servid

		  		}
		  		// Add object into array
		  		spList.push(sp);
	  		}
	  	} 
	});  

		connection.query('SELECT home_owner.last_name, home_owner.first_name, sp_feedback.comment, sp_feedback.rating, sp_feedback.time, sp_feedback.date FROM home_owner JOIN sp_feedback JOIN service_provider ON sp_feedback.hoid = home_owner.hoid AND service_provider.spid = sp_feedback.spid AND service_provider.spid = ' + session_spid, function(err, rows, fields) {  
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {

	  			// Create an object to save current row's data
		  		var feedback = {
		  			'name':rows[i].first_name + " " + rows[i].last_name,
		  			'comment':rows[i].comment,
		  			'rating':rows[i].rating,
		  			'date':dateFormat(rows[i].date, "fullDate"),
		  			'time':rows[i].time
		  		}
		  		// Add object into array
		  		feedbackList.push(feedback);
	  		} 
	  	}
	}); 

	var average_rating = 0;

	connection.query('SELECT ROUND((AVG(sp_feedback.rating)),1) AS "average_rate" FROM home_owner JOIN sp_feedback JOIN service_provider ON sp_feedback.hoid = home_owner.hoid AND service_provider.spid = sp_feedback.spid AND service_provider.spid = ' + session_spid, function(err, rows, fields) {  
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {
	  			// Create an object to save current row's data
		  		average_rating = rows[i].average_rate;
		  		}
	  		}

	  		res.render('profile_sp', { title: 'Profile', 'spList': spList, 'sp_account': sp_account, 'feedbackList': feedbackList, 'average_rating': average_rating });
	  		console.log(req.session.spid);
	});   
});

module.exports = router;
