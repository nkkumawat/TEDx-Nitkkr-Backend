/**
 * Created by sonu on 21/9/17.
 */
const express = require('express');
const router = express.Router();
const sanitizeHtml = require('sanitize-html');
const mysql = require('mysql');

const config = require('../config');
const con = mysql.createConnection(config.MYSQL);

router.get('/',  function (req , res) {
    const id = sanitizeHtml(req.query.id);
    var sql = "SELECT * FROM videos where id='"+id+"'";
    con.query(sql, function (err, result, fields) {
        res.send(result);
    });
});

module.exports = router;
