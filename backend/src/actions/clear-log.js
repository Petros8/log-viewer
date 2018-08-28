const SSH = require('simple-ssh')

module.exports = (server, db) => {
    server.post('/clear-log', (req, res) => {
        
        const sshDb = db.get('ssh')
        const app = req.body.appId
        const current = sshDb.find({ id: app }).value()        

        if(current) {
            
            let ssh = new SSH({
                host: current.host,
                user: current.login,
                pass: current.password
            })

            ssh = ssh.exec('>', {
                args: [current.logLocation]
            })

            ssh.on('error', function(err) {
                res.status(500).send({
                    message: 'Não foi possível limpar o arquivo de log'
                })
            })

            ssh.start({
                success: () => {
                    res.send('Ok')
                }
            })

        } else {
            res.status(404).send({
                message: 'Esta Aplicação Não Existe!'
            })
        }

    })

}