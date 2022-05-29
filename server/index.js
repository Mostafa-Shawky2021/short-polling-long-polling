const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
const messages = [];

app.post('/messages', ( req, res ) => {
    
    const {body} = req;
     messages.push(body);
     res.status(204).end();
    
})

app.get('/messages',(req,res)=>{
   
    res.json(messages);
    res.end();
})

const subscribers  = {};
app.get('/longmessages',( req,res )=>{
     const ID = Math.ceil(Math.random() * 10000);
     subscribers[ID] = res;

})

 
app.post( '/longmessages',(req,res)=>{
    const {body} = req;
    Object.entries( subscribers ).forEach(( [ID,response ])=>{
        response.json(body);
        delete subscribers[ID];
    });
    res.status(204).end()
})


app.listen(3001, ()=>{
    console.log('accept')
})

