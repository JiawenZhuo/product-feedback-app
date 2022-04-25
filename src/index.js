const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const {startDatabase} = require('./database/mongo');
const {insertComment, getComments} = require('./database/comments');
const {deleteComment, updateComment} = require('./database/comments');
//define the express app
const app = express();


const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

//add helmet to enhance your api security
app.use(helmet());

//use body parser to parse JSON bodies into js objects
app.use(bodyParser.json());

//enabling cors for all request
app.use(cors());

//adding morgan to log HTTP request
app.use(morgan('combined'));

app.get('/', async (req, res) =>{
    res.send(await getComments());
})

startDatabase().then(async () =>{
    await insertComment({title:"hello, now from the in-memory database"});
})

app.post('/', async(req, res)=>{
    const newComment = req.body;
    await insertComment(newComment);
    res.send({message: "new comment added"});
});

app.delete('/:id', async(req, res)=>{
    await deleteComment(req.params.id);
    res.send({ message: 'ad removed'});
});

app.put('/:id', async(req, res)=>{
    const updateComment = req.body;
    await updateComment(req.params.id, updateComment);
    res.send({message: 'comment updated'});
})

app.listen(3001, () =>{
    console.log('listen on port 3001');
})