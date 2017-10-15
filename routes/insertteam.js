/**
 * Created by sonu on 21/9/17.
 */
const express = require('express');
const router = express.Router();
const sanitizeHtml = require('sanitize-html');
const mysql = require('mysql');
var multer  = require('multer');
const cryptoRandomString = require('crypto-random-string');

const config = require('../config');
const con = mysql.createConnection(config.MYSQL);
var filename = cryptoRandomString(10);
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/images/team");
    },
    filename: function(req, file, callback) {
        callback(null,  filename+sanitizeHtml(req.body.membername)+".jpg");
    }
});
var upload = multer({
    storage: storage
}).array("teammemberimage", 3);
router.post('/',  function(req, res, next) {
    if(!req.session.username) {
        res.redirect("http://tedxnitkurukshetra.com");
    }else {
        upload(req, res, function (err) {
            if (err) {
                console.log(err);
                return res.end("Something went wrong!");
            } else {
                const post = req.body;
                const name = sanitizeHtml(post.membername);
                const position = sanitizeHtml(post.position);
                const sociallink = sanitizeHtml(post.sociallink);
                var sql = "INSERT INTO team(name, position, link, pic_url) " +
                    "values('" + name + "','" + position + "','" + sociallink + "','/images/team/" + filename+sanitizeHtml(post.membername) + ".jpg')";
                con.query(sql, function (err, result, fields) {
                    console.log(err);
                    res.redirect('/admin?tab=team');
                });
            }
        });
    }
});

module.exports = router;
