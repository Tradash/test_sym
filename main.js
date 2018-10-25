const http = require('http');

const webS = require('ws');
const wsServer = webS.Server;
const ws = new wsServer({port: 5001})

const views = new require('./control').views;
const controller = require('./control').controller;

const dataStore =  require('./dbmodel');
const db = new dataStore();

const fs = require('fs')




ws.on('connection', (socket) => {
  socket.on('message', (data) => {
    views.socket = socket;
    views.query = data;
    views.sender = "ws";
    controller(views, db);
  })
})

ws.on('close', () => {views.socket = null})

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
      views.req = req;
      views.res = res;
      views.sender = "post";
      controller(views, db);
        
    } 
    else {
      // Загрузка страницы для тестирования
      fs.readFile('./data/index.html', (err, dataF) => {res.end(dataF)})
    }
});
server.listen(5000);

