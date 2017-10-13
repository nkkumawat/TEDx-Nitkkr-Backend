/**
 * Created by sonu on 21/9/17.
 */
const express = require('express');
const router = express.Router();
const sanitizeHtml = require('sanitize-html');
const mysql = require('mysql');
var multer  = require('multer');
var randomstring = require("randomstring");

const config = require('../config');
const con = mysql.createConnection(config.MYSQL);
var filename = randomstring.generate(10);
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function(req, file, callback) {
        callback(null,   sanitizeHtml(req.body.speakername)+".jpg");
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
                return res.end("Something went wrong!");
            } else {
                const post = req.body;
                const name = sanitizeHtml(post.speakername);
                const topic = sanitizeHtml(post.topic);
                const description = sanitizeHtml(post.description);
                const id = sanitizeHtml(post.id);
                var sql = "Update speaker set name='"+name+"', topic = '"+topic+"',description ='"+description+"', pic_url='/images/"+sanitizeHtml(req.body.speakername)+".jpg' where id  = '" + id + "'";
                console.log(sql);

                // var sql = "INSERT INTO speaker(name, topic, description, pic_url) " +
                //     "values('" + name + "','" + topic + "','" + description + "','/images/" + filename + ".jpg')";
                con.query(sql, function (err, result, fields) {
                    res.redirect('/admin?tab=speakers');
                    console.log(err);
                });
            }
        });
    }
});

module.exports = router;
