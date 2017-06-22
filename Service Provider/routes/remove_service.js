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
        var remove = req.query.remove;
        var session_spid = req.session.spid;

        if (remove != "undefined") {
        connection.query('DELETE FROM services WHERE service_id = ' +  remove + ' AND service_id = ' + session_spid, function(err, rows, fields) {  
                 if (err) {
                 res.status(500).json({"status_code": 500,"status_message": "internal server error"});
                 } 
                res.redirect('/profile');
        }); 
    }
});


module.exports = router;
