const express = require('express');
const shortid = require('shortid');

const router = express.Router();

const { urls } = require('./urls_data');

router.get('/', (req, res) => {
    const urlList = [];
    Object.keys(urls).forEach((urlID) => {
        urlList.push({ id: urlID, longUrl: urls[urlID] });
    });
    res.send(urlList);
});

router.post('/', (req, res) => {
    /* const { longUrl } = req.body.longUrl; */
    /* console.log(longUrl); */
    const id = shortid.generate();
    urls[id] = req.body.longUrl;
    res.status(201).send({ id });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const longUrl = urls[req.params.id];
    if (longUrl) {
        res.status(200).send([id, longUrl]);
    } else {
        res.status(404).send('url shortener id not found');
    }
});

module.exports = router;
