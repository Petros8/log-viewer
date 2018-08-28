module.exports = (server, db) => {
    server.delete('/app/:id', (req, res, next) => {

        const sshDb = db.get('ssh')
        const id = req.params.id
        const current = sshDb.find({ id }).value()

        if(current) {
            sshDb.remove({ id }).write()
            res.send('Ok')
        } else {
            res.status(404).send({
                message: 'Esta Aplicação Não Existe!'
            })
        }

    })
}