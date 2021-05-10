const express = require('express');

const app = express();

app.use(express.json())

const routes = require('./route');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    res.setHeader('Access-Control-Allow-Headers','Content-Type');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
})

app.use(routes);

app.listen(5000)