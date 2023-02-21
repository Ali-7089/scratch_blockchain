const Block = require('./Block');
const cryptoHash = require('./crypto_hash');

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];
    }
    addBlock({data}){
      const newBlock = Block.mineBlock({
        prevBlock : this.chain[this.chain.length-1],
        data:data
      })
      this.chain.push(newBlock);
    }

    replaceChain(chain){
     if(chain.length<=this.chain.length){
      console.log("incoming chain is not longer")
      return
     }
     if(!Blockchain.isValidatChain(chain)){
      console.log("incoming chain is not valid ")
      return
     }
     this.chain = chain;
    }

    static isValidatChain(chain){
    if(JSON.stringify(chain[0]) !==JSON.stringify(Block.genesis())) return false;
    for(var i=1;i<chain.length;i++){
      const {timestamp, prevHash,hash,data , nonce , difficulty} = chain[i]
      if(prevHash !== chain[i-1].hash) return false;
      if(hash !== cryptoHash(timestamp,prevHash,data , nonce , difficulty)) return false;
    }
    return true;
    }
}

const blockchain = new Blockchain();

blockchain.addBlock({data:"block1"});
blockchain.addBlock({data:"block2"});
console.log(blockchain)
// console.log(Blockchain.isValidatChain(blockchain.chain))

module.exports = Blockchain




