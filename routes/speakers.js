/**
 * Created by sonu on 21/9/17.
 */
const express = require('express');
const router = express.Router();
const sanitizeHtml = require('sanitize-html');
const mysql = require('mysql');

const config = require('../config');
const con = mysql.createConnection(config.MYSQL);

router.get('/'  ,  function (req , res) {
    var sql = "SELECT * FROM speaker ";
    con.query(sql, function (err, result, fields) {
        res.send(result);
    });
});


module.exports = router;
