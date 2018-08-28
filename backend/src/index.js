const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
let server = express()
var expressWs = require('express-ws')(server);

server.use('', express.static(path.join(__dirname, 'public')))

server.use(bodyParser.json())
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.Router()

fs.readdirSync(path.join(__dirname, 'actions')).forEach(
    (file) => {
        let name = file.substr(0, file.indexOf('.'))
        console.log('Importing action from file: ' + name)
        require('./actions/' + name)(router, require('./db/db'))
    }
)

server.use('/api', router)

server.listen(3000, () => {
    console.log('server initialized on http://localhost:3000')
})