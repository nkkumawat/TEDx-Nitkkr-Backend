/**
 * Created by sonu on 21/9/17.
 */
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next)  {
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;