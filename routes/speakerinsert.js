/**
 * Created by sonu on 21/9/17.
 */
const express = require('express');
const router = express.Router();
const sanitizeHtml = require('sanitize-html');
const mysql = require('mysql');
var multer  = require('multer');

const config = require('../config');
const con = mysql.createConnection(config.MYSQL);
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function(req, file, callback) {
        callback(null,  sanitizeHtml(req.body.speakername)+".jpg");
    }
});
var upload = multer({
    storage: storage
}).array("images", 3);

router.post('/',  function(req, res, next) {
    upload(req ,res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }else {
            const post = req.body;
            const name  = sanitizeHtml(post.speakername);
            const topic = sanitizeHtml(post.topic);
            const description = sanitizeHtml(post.description);
            var sql = "INSERT INTO speaker(name, topic, description, pic_url) " +
                "values('"+name+"','"+topic+"','"+description+"','/images/"+name+".jpg')";
            con.query(sql, function (err, result, fields) {
                res.redirect('/admin');
            });
        }
    });
});

module.exports = router;
