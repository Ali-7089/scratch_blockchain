const express = require('express');
const bodyParse = require('body-parser')
const Blockchain = require('./Blockchain');
const PubSub = require('./publishSubscribe');
const request = require('request');

const app = express();
const blockchain = new Blockchain();
const DEFAULT_PORT = 3000;
const DEFAULT_PORT_ADDRESS = `http://localhost:${DEFAULT_PORT}`

let PEER_PORT;
if(process.env.GENERATE_PEER_PORT==='true'){
    console.log("peer wala chl rha h ")
   PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random()*1000)
}

const pubsub = new PubSub({blockchain});
setTimeout(()=>pubsub.broadCast() , 1000)

app.use(bodyParse.json())
app.get('/api/getBlocks' , (req,res)=>{
    res.json(blockchain.chain)
})

app.post('/api/mine', (req,res)=>{
    const {data} = req.body
    blockchain.addBlock({data})
    pubsub.broadCast()
    res.redirect('/api/getBlocks')
})

const syncChain=()=>{
    request({url:`${DEFAULT_PORT_ADDRESS}/api/getBlocks`} , (error, response,body)=>{
        if(!error && response.statusCode===200){
            console.log("aa rha h bhai")

            const rootChain = JSON.parse(body);
            blockchain.replaceChain(rootChain)
        }

    })
}


const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT , ()=>{
     console.log("running server")
     syncChain()
    
    } )
