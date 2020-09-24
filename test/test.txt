const net = require('net');
const fs = require('fs');
const server = net.createServer();
const port = 8000;


server.on('connection', client => {
  client.setEncoding('utf8');
  client.on('data', filePath => {
    fs.readFile(filePath, 'utf8', (error, str) => {
      if (!error) client.write(str);
    })
    console.log("Message from client: ", filePath)
  });
});

server.listen(port, 'localhost', () =>
  console.log(`Server is listening to port ${port}`)
);