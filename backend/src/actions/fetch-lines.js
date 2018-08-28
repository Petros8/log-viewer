const SSH = require('simple-ssh')

module.exports = (server, db) => {

    const createFileName = (appShortname) => {

        let currentDate = new Date()

        return appShortname.toUpperCase() + '-'
            + currentDate.getDate() + '-'
            + (currentDate.getMonth() + 1) + '-'
            + currentDate.getFullYear()
            + '.log'

    }

    server.get('/fetch-lines', 
        (req, res) => {

            const { app, qtdLines } = req.query

            if( isNaN(qtdLines) || qtdLines > 100000 || qtdLines < 0) {
                res.status(412).send({
                    message: 'Quantidade de Linhas Inválida, so é possível requisitar entre 1 e 100.000 linhas'
                })
            } else {
                const sshDb = db.get('ssh')
                const current = sshDb.find({ id: app }).value()
                if(current) {
                    
                    let ssh = new SSH({
                        host: current.host,
                        user: current.login,
                        pass: current.password
                    })

                    ssh.exec(
                        'tail', {
                            args: ['-n', qtdLines, current.logLocation],
                            exit: (code, stdout) => {
                                res.type('application/octet-stream')
                                res.attachment(createFileName(current.shortname))
                                res.send(stdout)
                            }
                        }
                    ).start();

                    ssh.on('error', function(err) {
                        ssh.end();
                        res.status(412).send({
                            message: 'Error ao Tentar conectar no Servidor SSH!'
                        })
                    });

                } else {
                    res.status(404).send({
                        message: 'Esta Aplicação Não Existe!'
                    })
                }

            }

        }
    )

}