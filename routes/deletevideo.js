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
    if(!req.sessoin.username) {
        res.redirect("http://tedxnitkurukshetra.com");
    } else {
        const post = req.body;
        const videoTitle = sanitizeHtml(post.videoTitle);
        var sql = "Delete from videos where title = '" + videoTitle + "'";
        con.query(sql, function (err, result, fields) {
            res.redirect('/admin');
        });
    }
});

module.exports = router;
