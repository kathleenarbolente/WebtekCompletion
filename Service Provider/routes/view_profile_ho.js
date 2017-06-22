var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');

/* GET HO's profile page. */
router.get('/', function(req, res, next) {
	var id = req.query.id;
	var viewaccount = req.query.viewaccount;

		//mysql
	var mysql      = require('mysql');  
	var connection = mysql.createConnection({  
	  host     : 'localhost',  
	  user     : 'root',  
	  password : '',  
	  database : 'salon',
	  dateStrings:true 
	});  

	var customers;
	var feedback_ho_list = [];

	connection.query('SELECT * from customers WHERE customers.customer_id = ' + id, function(err, rows, fields) {  
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {

		  		customers = {
		  			'customer_id':rows[i].customer_id,
					'name':rows[i].first_name + " " + rows[i].last_name,
		  			'gender':rows[i].gender,
					'address':rows[i].address,
		  			'birthdate':rows[i].birthdate,
					'mobile_number':rows[i].mobile_number,
					'email':rows[i].email,
		  		}
	  		}
	  	} 
	}); 


		connection.query('SELECT service_providers.last_name, service_providers.first_name, feedback.comments, feedback.rating, feedback.time, feedback.date FROM service_providers JOIN feedback JOIN customers ON feedback.customer_id = customers.customers_id AND service_providers.serv_id = feedback.serv_id AND customers.customers_id = ' + id + ' ', function(err, rows, fields) {  
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {

		  		var feedback = {
		  			'name':rows[i].first_name + " " + rows[i].last_name,
		  			'comment':rows[i].comment,
		  			'rating':rows[i].rating,
		  			'date':dateFormat(rows[i].date, "fullDate"),
		  			'time':rows[i].time
		  		}
		  		// Add object into array
		  		feedback_ho_list.push(feedback);
	  		} 
	  	}
	}); 

		var average_rating = 0;
		connection.query('SELECT ROUND((AVG(feedback.rating)),1) AS "average_rate" FROM customers JOIN feedback JOIN service_providers ON feedback.serv_id = customers.customer_id AND service_providers.serv_id = feedback.serv_id AND customers.customer_id= ' + id, function(err, rows, fields) {  
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {
	  			// Create an object to save current row's data
		  		average_rating = rows[i].average_rate;
		  		}
	  	} 
	  		res.render('view_profile_ho', { title: 'View Profile', 'feedback_ho_list' : feedback_ho_list, 'average_rating' :average_rating, 'customers': customers});
	}); 

});

module.exports = router;
