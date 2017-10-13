/**
 * Created by sonu on 21/9/17.
 */
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next)  {
    req.session.destroy();
    res.header('Cache-Control', 'no-cache');
    res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');

    res.redirect("/login");
});

module.exports = router;module.exports = router;