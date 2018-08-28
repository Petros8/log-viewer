module.exports = (server, db) => {
    server.put('/app', (req, res, next) => {

        const sshDb = db.get('ssh')
        const body = req.body

        const { id } = body

        const current = sshDb.find({ id }).value()

        if(current) {
            
            current.shortname = body.shortname
            current.description = body.description
            current.login = body.login
            current.password = body.password ? body.password : current.password
            current.host = body.host
            current.logLocation = body.logLocation

            sshDb.find({ id }).assign(current).write()
            
            res.send(current)

        } else {
            res.status(404).send({
                message: 'Esta Aplicação Não Existe!'
            })
        }

    })
}