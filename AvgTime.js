const Blockchain = require("./Blockchain");

const blockchain = new Blockchain();
let prevTimestamp, nextTimestamp , nextBlock , diff , avgtime;
blockchain.addBlock({data:'hey buddy'})

let time = [];
for(var i=1;i<=1000;i++){
 prevTimestamp = blockchain.chain[blockchain.chain.length-1].timestamp;
 blockchain.addBlock({data:`block${i}`});
 nextBlock = blockchain.chain[blockchain.chain.length-1]

 nextTimestamp = nextBlock.timestamp;

 diff = nextTimestamp - prevTimestamp
 time.push(diff)

 avgtime = time.reduce((total, num)=> total + num)/time.length
 
 console.log(
    `Time to min block ${diff} , difficulty ${nextBlock.difficulty} ,average time ${avgtime}`
    )
}