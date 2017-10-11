/**
 * Created by sonu on 21/9/17.
 */
const express = require('express');
const router = express.Router();
const sanitizeHtml = require('sanitize-html');
const mysql = require('mysql');

const config = require('../config');
const con = mysql.createConnection(config.MYSQL);
router.post('/',  function(req, res, next) {
    if(!req.session.username) {
        res.redirect("http://tedxnitkurukshetra.com");
    }else {
        const post = req.body;
        const title = sanitizeHtml(post.title);
        const description = sanitizeHtml(post.description);
        const url = sanitizeHtml(post.url);
        var sql = "INSERT INTO videos(title, description, video_url) " +
            "values('" + title + "','" + description + "','" + url + "')";
        console.log(sql);
        con.query(sql, function (err, result, fields) {
            res.redirect('/admin?tab=video');
        });
    }
});

module.exports = router;
