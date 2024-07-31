const express = require('express')
const router = express.Router()


const { createNewMessage } = require('../db/queries')

router.get('/', (req, res, next) => {
    res.render('form', {title: 'New Message'})
})

router.post('/', async (req, res, next) => {
    const newMessage = {
        user: req.body.user,
        text: req.body.message,
        added: new Date()
    }

    await createNewMessage(newMessage)

    return res.redirect("/");

})

module.exports = router;