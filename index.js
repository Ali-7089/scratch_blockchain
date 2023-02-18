const express = require('express');
const Blockchain = require('./Blockchain');

const blockchain = new Blockchain();
const app = express();
app.get('/api/getBlocks' , (req,res)=>{
    res.json(blockchain.chain)
})

const PORT = 3000;
app.listen(PORT , ()=> console.log("running server"))
