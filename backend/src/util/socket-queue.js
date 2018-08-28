const SocketQueue = (ws) => {
    
    const QUEUE_DELAY_TIME = 120;
    const socketQueue = {};
    
    const queue = [];
    let isLoop = false;

    const stall = (time) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), time)
        })
    }

    socketQueue.addToQueue = (text) => {
        stall(QUEUE_DELAY_TIME).then(
            () => {
                queue.push(text)
            }
        )
    }

    const nextFromQueue = () => {
        return queue.shift()
    }

    socketQueue.start = () => {
        isLoop = true;
    }

    socketQueue.stop = () => {
        isLoop = false;
    }

    const execute = () => {
        stall(QUEUE_DELAY_TIME).then(
            () => {
                let next = nextFromQueue()
                if(next && isLoop) {
                    ws.send(next)
                }
                execute()
            }
        )
    }

    execute()

    return socketQueue;
}

module.exports = SocketQueue
