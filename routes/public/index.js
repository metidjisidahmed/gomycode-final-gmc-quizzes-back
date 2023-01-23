var express = require('express');
var loginRoute = require('./login')
var signupRoute = require('./signup')
var categoriesRoute = require('./categories')

var router = express.Router();

// login admin + login user
router.use('/login', loginRoute)
//sign up user
router.use('/signup' ,signupRoute)
// get all categories
router.use('/categories', categoriesRoute )



module.exports = router;
