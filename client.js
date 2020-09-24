const net = require('net');
const fs = require('fs');
const stdin = process.stdin;
const stdout = process.stdout;
stdin.setRawMode(true);
stdin.setEncoding('utf8');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "What file would you like? "
});

const client = net.createConnection({
  host: 'localhost',
  port: 8000
});

client.setEncoding('utf8');

client.on('connect', () => {
  console.log("Connected to server");
  rl.prompt();
  rl.on('line', (line) => {
    client.write(line);
  })
});

const savePath = './test/test.txt'

client.on('data', message => {
  fs.writeFile(savePath, message, err => {
    if (err) throw new Error("couldn't write!");
    console.log(`Downloaded and saved ${Buffer.byteLength(message)} bytes to ${savePath}`);
    rl.prompt();
  })
});

client.on('error', err => console.log("Error: " + err));

client.on('end', () => console.log("You are disconnected from server"));