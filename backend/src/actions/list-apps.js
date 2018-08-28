module.exports = (server, db) => {
    server.get('/app', (req, res, next) => {
        res.send(
            db.get('ssh').value().map(
                (element) => {
                    return {
                        ...element,
                        password: undefined
                    }
                }
            )
        )
    })

    server.get('/app/:id', (req, res, next) => {
        const result = db.get('ssh').find({id: req.params.id}).value()
        if(result) {
            const safeCopy = {} 
            Object.assign(safeCopy, result)
            safeCopy.password = undefined
            res.send(safeCopy)
        } else {
            res.status(404).send({ message: 'Esta Aplicação Não Existe!' })
        }
    })

}