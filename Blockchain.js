const Block = require('./Block')


class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];
    }
    addBlock(chain){
      const newBlock = Block.mineBlock({
        prevBlock : this.chain[this.chain.length-1],
        data:"kuch bhi"
      })
      this.chain.push(newBlock);
    }
}

const blockchain = new Blockchain();

const result = blockchain.addBlock(blockchain);
console.log(result)


