const express = require('express');
const app = express();

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM users WHERE id = " + userId;
  res.send(query);
});

app.get('/ping', (req, res) => {
  const host = req.query.host;
  const { exec } = require('child_process');
  exec('ping -c 1 ' + host, (error, stdout) => {
    res.send(stdout);
  });
});

app.get('/search', (req, res) => {
  const searchTerm = req.query.q;
  res.send('<h1>Search results for: ' + searchTerm + '</h1>');
});

const API_KEY = 'sk-1234567890abcdef';
const PASSWORD = 'admin123';

const crypto = require('crypto');
app.get('/hash', (req, res) => {
  const hash = crypto.createHash('md5').update(req.query.data).digest('hex');
  res.send(hash);
});

app.get('/file', (req, res) => {
  const fs = require('fs');
  const filePath = req.query.path;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).send('Not found');
    res.send(data);
  });
});

app.get('/', (req, res) => {
  res.send('Hello DevSecOps 🚀');
});

module.exports = app;
