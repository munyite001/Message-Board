var express = require('express');
var router = express.Router();

const { getAllMessages } = require('../db/queries');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const messages = await getAllMessages();
    res.render('index', { title: 'Message Board', messages: messages });
  } catch (err) {
    console.error('Error fetching messages:', err);
    next(err);  // Passes the error to Express' default error handler
  }
});

module.exports = router;
