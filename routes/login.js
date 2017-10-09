/**
 * Created by sonu on 21/9/17.
 */
const express = require('express');
const router = express.Router();
const sanitizeHtml = require('sanitize-html');
const mysql = require('mysql');

const config = require('../config');
const con = mysql.createConnection(config.MYSQL);

/* GET home page. */
router.get('/', function(req, res, next)  {
    // req.session.username = "nkkumawat@nkkumawat.me";
    if (!req.session.username) {
        res.render('login',{} );
    } else {
        res.redirect('/admin');
    }
});
router.post('/', function(req, res, next)  {
    const post = req.body;
    const username  = sanitizeHtml(post.user);
    const password = sanitizeHtml(post.password);
    var sql = "SELECT * FROM login WHERE username='"+username+"'";
    con.query(sql, function (err, result, fields) {
        if( result.length > 0 && result[0].password === password ) {
            console.log("Auth set");
            req.session.username = post.user;
            res.send({"result" : "Found"});
        }else {
            res.send({"result": "NotFound"});
        }
    });
});

module.exports = router;
