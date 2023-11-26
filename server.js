require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;

app.use(
    bodyParser.json({
        limit: '20mb'
    })
)

app.use(
    bodyParser.urlencoded({
        limit: '20mb',
        extended: true,
        parameterLimit: 1000000
    })
)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use(require('./app/routes'))

app.use(cors());

app.listen(PORT, () => {
    console.log('La aplicacion esta en linea');
})