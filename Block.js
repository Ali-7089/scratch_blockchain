const cryptoHash = require('./crypto_hash');
const {Genesis_block} = require('./Gensis')

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
    const {difficulty} = Block.genesis()
    let timestamp , hash;
    const prevHash = prevBlock.hash;
    let nonce  =0;
    do{
     nonce++;
     timestamp = Date.now()
    //  console.log("hey")
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
