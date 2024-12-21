// Server sent events
const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/stream', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });
  res.flushHeaders();
  setInterval(() => {
    res.write('data: Hello, client!\n\n');
  }, 1000);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
