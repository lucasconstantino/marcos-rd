var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tests', function(req, res, next) {
  res.render('tests');
});

// router.post('/signup', function(req, res, next) {
//   req.accepts('json');
//   console.log(req.body);
//   res.redirect('/logged');
// });
//
// router.get('/logged', function(req, res, next) {
//   res.render('tests');
// });

module.exports = router;
