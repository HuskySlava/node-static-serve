import express from 'express';
import fs from 'fs';
import {telegramBot} from "./telegram-bot.js";
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const cfg = JSON.parse(fs.readFileSync('./cfg.json'));
const listenPort = cfg.serverPort;
import geoIP from 'geoip-lite';

const logRequest = (req, res, next) => {
    let reqTime = new Date();
    let reqIP = req.socket.remoteAddress;
    let location = geoIP.lookup('207.97.227.239');

    let log = `
        [ ${reqTime} ]
        [ IP: ${reqIP} ]
        [ FROM: ${location["country"]}, ${location["city"]}}]
    `;
    if(cfg.telegram && cfg.telegram.bot){
        telegramBot.sendMessage(log);
    }
    next();
}

app.use(logRequest, express.static(__dirname + cfg.staticFolder));

app.get('/', logRequest, (req, res) => {
    res.send('/public" folder is empty');
});

app.get('*', logRequest, (req, res) => {
    res.sendStatus(404);
})

app.listen(listenPort, process.env.IP, () => {
    console.log(`Server started listening on ${listenPort}`);
});
