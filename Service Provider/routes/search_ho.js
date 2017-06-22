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


/* GET search page. */
router.get('/', function(req, res, next) {
var search = req.query.search;
var val = req.query.val;

 if (val == "accept") {
 	var hoList_search =	searchHO(search);
   }
  res.render('search', { title: 'Search', 'hoList_search': hoList_search});
});

module.exports = router;
