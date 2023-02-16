const cryptoHash = require('./crypto_hash');
const {Genesis_block} = require('./Gensis')

class Block{
   constructor({timestamp,prevHash,hash,data}){
     this.timestamp = timestamp;
     this.prevHash = prevHash;
     this.hash = hash
     this.data = data
   }
  static genesis(){
    return new Block(Genesis_block)
   }
  static mineBlock({prevBlock,data}){
    const timestamp = Date.now();
    const prevHash = prevBlock.hash;
    const hash = cryptoHash(timestamp,prevHash,data);
    return new Block({
        timestamp,
        prevHash,
        hash,
        data
    })
   }
}

const block1 = new Block({
prevHash:'0x123',
timestamp:Date.now(),
hash:'0x123',
data:'hello'});

// console.log(block1)
console.log(Block.mineBlock({prevBlock:block1 , data:"block2"}));
// console.log(Block.genesis())

module.exports = Block
