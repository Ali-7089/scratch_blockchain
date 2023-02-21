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
        this.subscriber.on('message' , (channel , message)=>{
          console.log(message)
        })
    }

    publis(channel , message){
        this.publisher.publish(channel, message)
    }

    broadCast(){
        this.publis({
            channel : CHANNEL.BLOCKCHAIN,
            message : this.blockchain.chain
        })
    }

}

module.exports = PubSub;