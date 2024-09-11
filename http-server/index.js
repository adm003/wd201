const express = require('express');
const minimist = require('minimist');

const app = express();
const port = minimist(process.argv).port || 5000; // Use the provided port or default to 5000

app.use(express.static('http-server'));

app.get('/', (req, res) => {
    res.sendFile('home.html', { root: 'http-server' });
});

app.get('/registration', (req, res) => {
    res.sendFile('registration.html', { root: 'http-server' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});