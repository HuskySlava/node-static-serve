import { Telegraf } from 'telegraf'
import fs from 'fs';

const cfg = JSON.parse(fs.readFileSync('./cfg.json'));
const bot = new Telegraf(cfg.telegram.bot.token);

const TelegramBot = function(){
    this.messagesAmount = 0;

    this.sendMessage = (message) => {};

    bot.launch().then(() => {
       this.sendMessage = (message) => {
           this.messagesAmount++;

           setTimeout(() => {
               bot.telegram.sendMessage(cfg.telegram.logChannel, message).then( () => {
               }).catch( err => {
                   console.log(err)
                   // fs.appendFile(cfg.logFile, err, () => {})
               })
               this.messagesAmount--;
           }, 1000 * this.messagesAmount)
       }
    })
}

export const telegramBot = new TelegramBot();


