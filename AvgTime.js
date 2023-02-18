const Block = require("./Block");
const Blockchain = require("./Blockchain");

const blockchain = new Blockchain();
let prevTimestamp , nextTimestamp , nextBlock , diff , avgtime;
let times = [];
blockchain.addBlock({data:"hello"})

for(var i=1;i<=10;i++){
    prevTimestamp = blockchain.chain[blockchain.chain.length-1].timestamp
    blockchain.addBlock({data :`Block ${i}`});
    
    nextBlock = blockchain.chain[blockchain.chain.length-1];
    nextTimestamp = nextBlock.timestamp;

    diff = nextTimestamp - prevTimestamp;
    times.push(diff);

    avgtime = times.reduce((total, num)=> total+num)/ times.length
    console.log(
        `Time to mine block ${diff} ,difficulty ${nextBlock.difficulty} , agvTime ${avgtime} `
        )
}