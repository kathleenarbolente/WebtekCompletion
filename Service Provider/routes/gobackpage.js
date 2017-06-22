var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var id = req.session.ho_feedback;
	console.log(req.session.ho_feedback);
  res.redirect('/profileCustomer?id=' + id + '&viewaccount=true');
});

module.exports = router;
