var express = require('express');
var router = express.Router();

/* GET transaction page. */
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
 
	var ho_transaction_list = [];
	var total_amount = 0;

	 var session_spid = req.session.spid;
    
});

module.exports = router;
