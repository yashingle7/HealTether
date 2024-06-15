// we will be doing routing so needed express
const express = require('express');
const router = express.Router();

const {register, login, forgotpassword, resetpassword} = require('../controllers/auth');           // register, login, forgotpassword, resetpassword are functions

router.route("/register").post(register);                                                          //thode above function is called
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword/:resetToken").put(resetpassword);


module.exports = router;