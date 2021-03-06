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
        callback(null, "./public/images");
    },
    filename: function(req, file, callback) {
        callback(null,  filename+sanitizeHtml(req.body.speakername)+".jpg");
    }
});
var upload = multer({
    storage: storage
}).array("images", 3);

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
                const name = sanitizeHtml(post.speakername);
                const topic = sanitizeHtml(post.topic);
                const description = sanitizeHtml(post.description);
                var sql = "INSERT INTO speaker(name, topic, description, pic_url) " +
                    "values('" + name + "','" + topic + "','" + description + "','/images/" + filename+sanitizeHtml(req.body.speakername) + ".jpg')";
                con.query(sql, function (err, result, fields) {
                    res.redirect('/admin?tab=speakers');
                });
            }
        });
    }
});

module.exports = router;
