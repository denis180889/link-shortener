import express = require('express');
import bodyParser = require('body-parser');
import randomstring = require("randomstring");

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

interface Link {
    id: number;
    originalLink: string;
    code: string;
    shortenLink: string;
}

const links: Link[] = [];

app.post('/link', (req, res) => {
    const code = generateShortenLink();
    const shortenLink = req.protocol + '://' + req.get('host') + '/' + code;
    const link = {
        id: links.length + 1,
        originalLink: req.body.link,
        code: code,
        shortenLink: shortenLink
    };
    links.push(link);
    res.send(link);
})

app.get('/:shortenLink', (req, res) => {
    const result = links.find(l => l.code === req.params.shortenLink)
    console.log(result);
    if (result) return res.redirect(result.originalLink);
    return "Link was not found";
})

app.listen(3000, () => console.log('Listening...'));

function generateShortenLink() {
    return randomstring.generate({
        length: 6,
        charset: 'alphabetic',
        capitalization: 'lowercase'
    });
}