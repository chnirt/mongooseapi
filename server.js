const http = require('http')
const app = require('./app')

const port = process.env.PORT || 6969

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Listening on ${ port }`)
})

// var express = require('express');
// var port = process.env.PORT || 3000;
// var app = express();
// app.get('/', function (req, res) {
// 	res.send(JSON.stringify({ Hello: 'World' }));
// });
// app.listen(port, function () {
// 	console.log('Example app listening on port !');
// });
