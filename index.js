const express = require('express');
const bodyParse = require('body-parser')
const Blockchain = require('./Blockchain');
const PubSub = require('./publishSubscribe');


const blockchain = new Blockchain();

const pubsub = new PubSub({blockchain});
setTimeout(()=>pubsub.broadCast , 1000)

const app = express();
app.use(bodyParse.json())
app.get('/api/getBlocks' , (req,res)=>{
    res.json(blockchain.chain)
})

app.post('/api/mine', (req,res)=>{
    const {data} = req.body
    blockchain.addBlock({data})
    blockchain.replaceChain(blockchain.chain)
    res.redirect('/api/getBlocks')
})

const PORT = 3000;
app.listen(PORT , ()=> console.log("running server"))
