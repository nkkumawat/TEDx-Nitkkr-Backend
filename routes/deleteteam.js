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
        const memberName = sanitizeHtml(post.memberName);
        var sql = "Delete from team where name = '" + memberName + "'";
        con.query(sql, function (err, result, fields) {
            res.redirect('/admin?tab=team');
        });
        console.log(sql);
    }
});

module.exports = router;
