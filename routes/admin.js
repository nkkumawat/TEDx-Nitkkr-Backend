/**
 * Created by sonu on 21/9/17.
 */
const express = require('express');
const router = express.Router();
const sanitizeHtml = require('sanitize-html');
const mysql = require('mysql');
const config = require('../config');
const con = mysql.createConnection(config.MYSQL);

/* GET home page. */
router.get('/'  ,  function (req , res) {
    if(!req.session.username) {
        res.redirect('/login');
    }else {
        res.render('admin',{"username" : req.session.username});
    }
});
module.exports = router;
