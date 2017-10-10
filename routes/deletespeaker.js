/**
 * Created by sonu on 21/9/17.
 */
const express = require('express');
const router = express.Router();
const sanitizeHtml = require('sanitize-html');
const mysql = require('mysql');
const config = require('../config');
const con = mysql.createConnection(config.MYSQL);

router.post('/', function(req, res, next)  {
    if(!req.session.username) {
        res.redirect("http://tedxnitkurukshetra.com");
    }else {
        const post = req.body;
        const speakerName = sanitizeHtml(post.speakerName);
        var sql = "Delete from speaker where name = '" + speakerName + "'";
        con.query(sql, function (err, result, fields) {
            res.redirect('/admin');
        });
    }
});

module.exports = router;
