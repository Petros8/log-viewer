const SocketQueue = require('../util/socket-queue')
const SSH = require('simple-ssh')

module.exports = (server, db) => {
    server.ws('/log', (ws, req, res) => {
        console.log('Connection Opened')
        const socketQueue = SocketQueue(ws);

        const sshDb = db.get('ssh')
        const body = req.query
        const { app } = body
        const current = sshDb.find({ id: app }).value()
        if(current) {

            let ssh = new SSH({
                host: current.host,
                user: current.login,
                pass: current.password
            })

            ssh = ssh.exec('tail', {
                args: ['-f', current.logLocation],
                out: (stdout) => {
                    socketQueue.addToQueue(stdout)
                }
            })

            ssh.on('error', function(err) {
                ws.close();
                ssh.end();
            });
            
            ssh.start()
            socketQueue.start()
    
            ws.on('close', 
                () => {
                    console.log('Connection Closed')
                    ssh.end()
                    socketQueue.stop()
                    ws.close()
                }
            )
            
        } else {
            ws.close()
        }
    })
}
