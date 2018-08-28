const uuid = require('uuid/v4')

module.exports = (server, db) => {
    server.post('/app', (req, res, next) => {

        const sshDb = db.get('ssh')
        const body = req.body

        const { id } = body

        const newElement = {...body, id: uuid()}
        sshDb.push(newElement).write()
        res.send(newElement)

    })
}