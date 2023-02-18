const cryptoHash = require('./crypto_hash');
const {Genesis_block, MIN_RATE} = require('./Gensis')

class Block{
   constructor({timestamp,prevHash,hash,data, nonce , difficulty}){
     this.timestamp = timestamp;
     this.prevHash = prevHash;
     this.hash = hash
     this.data = data
     this.nonce = nonce
     this.difficulty = difficulty
   }
  static genesis(){
    return new Block(Genesis_block)
   }
  static mineBlock({prevBlock,data}){
    let {difficulty} = Block.genesis()
    let timestamp , hash;
    const prevHash = prevBlock.hash;
    let nonce  =0;
    do{
     nonce++;
     timestamp = Date.now()
     difficulty = Block.adjustDifficulty({originalBlock:prevBlock , timestamp})
    hash = cryptoHash(timestamp , prevHash ,data , nonce, difficulty)
    }while(hash.substring(0,difficulty).toString() !== "0".repeat(difficulty).toString());
    return new Block({
        timestamp,
        prevHash,
        hash,
        data,
        nonce,
        difficulty
    })
   }

   static adjustDifficulty({originalBlock , timestamp}){
      const {difficulty} = originalBlock
      if(difficulty<1) return 1;
      const diff = originalBlock.timestamp - timestamp;
      if(diff>MIN_RATE) return difficulty - 1;
      return difficulty + 1;
   }
}
const block1 = new Block({
prevHash:'0x123',
timestamp:Date.now(),
hash:'0x123',
data:'hello'});

// console.log(block1)
Block.mineBlock({prevBlock:block1 , data:"block2"});
// console.log(Block.genesis())

module.exports = Block
