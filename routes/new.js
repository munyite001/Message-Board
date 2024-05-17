const express = require('express')
const router = express.Router()


const messages = require('./messages')


router.get('/', (req, res, next) => {
    res.render('form', {title: 'New Message'})
})

router.post('/', (req, res, next) => {
    const newMessage = {
        user: req.body.user,
        text: req.body.message,
        added: new Date()
    }

    messages.push(newMessage)

    return res.redirect("/");

})

module.exports = router;