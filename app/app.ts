import express = require('express');
import bodyParser = require('body-parser');
import randomstring = require("randomstring");
import path = require('path');
import { insertObject, findObject } from './mongoClient';

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, `public`)));

app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `pug`);

export interface Link {
    originalLink: string;
    code: string;
    shortenLink: string;
}

app.get('/', (req: any, res: any) => {
    return res.render(`index`);
})

app.post('/link', (req: any, res: any) => {
    console.log("Application is working");
    const code = generateShortenLink();
    const shortenLink = req.protocol + '://' + req.get('host') + '/' + code;
    const link = {
        originalLink: req.body.link,
        code: code,
        shortenLink: shortenLink
    };

    insertObject("links", link);

    res.send(link.shortenLink);
})

app.get('/:shortenLink', (req: any, res: any) => {
    findObject("links", { code: req.params.shortenLink }).then(
        result => {
            console.log("Link was found. Redirecting...");
            if (result) return res.redirect(result.originalLink);
        },
        err => {
            console.log(err);
            return "Link was not found";
        }
    )
})

app.listen(3000, () => console.log('Listening...'));

function generateShortenLink() {
    return randomstring.generate({
        length: 6,
        charset: 'alphabetic',
        capitalization: 'lowercase'
    });
}