const redis = require('redis')

const CHANNEL = {
    TEST:'test',
    BLOCKCHAIN:'blockchain'
}
class PubSub{
    constructor({blockchain}){
        this.blockchain = blockchain
        this.publisher = redis.createClient()
        this.subscriber = redis.createClient();

        this.subscriber.subscribe(CHANNEL.TEST);
        this.subscriber.subscribe(CHANNEL.BLOCKCHAIN);
        this.subscriber.on('message' , (channel , message)=>{
            console.log(`message ${message} publish at ${channel} `)
           const newChain = JSON.parse(message);
           if(channel===CHANNEL.BLOCKCHAIN){
            this.blockchain.replaceChain(newChain);
           }
        })
    }

    publis({channel , message}){
        this.publisher.publish(channel, message)
    }

    broadCast(){
        this.publis({
            channel : CHANNEL.BLOCKCHAIN,
            message :JSON.stringify(this.blockchain.chain)
        })
    }

}

module.exports = PubSub;