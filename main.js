const http = require('http');

const webS = require('ws');
const wsServer = webS.Server;
const ws = new wsServer({port: 5001})

const views = new require('./control').views;
const controller = require('./control').controller;

const dataStore =  require('./dbprovider');
const db = new dataStore();

const fs = require('fs')



//console.log('check db ',db);

let openWS;

/*ws.on('connection', (socket) => {
  let d, resp;
  console.log('WS online');
  openWS = socket;
  socket.on('message', (data) => {
    const v = valData(data);
    if (v) { resp = getData(JSON.parse(data))}
    d = {n:1, d:data};
    socket.send(JSON.stringify(d));
    d = {n:2, d:resp};
    socket.send(JSON.stringify(d));
  })
}); */

ws.on('connection', (socket) => {
  socket.on('message', (data) => {
    views.socket = socket;
    views.query = data;
    controller(views, db);
  })
})

ws.on('close', () => {views.socket = null})

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
      views.req = req;
      views.res = res;
      controller(views, db);
        
    } 
    else {
      fs.readFile('./data/index.html', (err, dataF) => {res.end(dataF)})
    }
});
server.listen(5000);

