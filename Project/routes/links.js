const express = require('express');
const router = express.Router();
const Link = require('../models/link');

router.post('/add-link', (req, res, next) => {
    let newLink = new Link({
        url: req.body.url
    });

    newLink.save((err, link) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add link' });
        } else {
            res.json({ success: true, msg: 'Link added', link: link });
        }
    });
});

router.get('/fetch-links', (req, res, next) => {
    Link.find({}, (err, links) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to fetch links' });
        } else {
            res.json({ success: true, links: links });
        }
    });
});

module.exports = router;