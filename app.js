const express = require('express');
const fs = require('fs');

const app = express();
const cfg = JSON.parse(fs.readFileSync('./cfg.json'));
const listenPort = cfg.serverPort;

const logRequest = (req, res, next) => {
    let reqTime = new Date();
    let reqIP = req.socket.remoteAddress; 
    let log = `"${req.originalUrl}","${reqTime}","${reqIP}" \n`;
    fs.appendFile(cfg.logFile, log, () => {});
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