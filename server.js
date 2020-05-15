const express = require('express')
const mongodb = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');
const tinify = require("tinify");
tinify.key = "JlYJ6Rc22LBy6ZsTlD0HCW6D3bHZjqGc";
const url = 'mongodb://localhost:27017/';
const app = express();

app.use(express.json());
const port = 3000;

async function getUser(info) {
    const client = await mongodb.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = client.db('socialDatabase');
    let key = Object.keys(info);
    let userInfo = await db.collection('users').findOne({ key: info['key'] });
    await client.close();
    return userInfo;
}

async function addUser(info) {
    const client = await mongodb.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = client.db('socialDatabase');
    await db.collection('users').insertOne(info);
    await client.close();
}

app.get('/getUser', async (req, res) => {
    var userInfo;
    Object.keys(req.query).length != 0 ? userInfo = await getUser(req.query) : res.send('Please provide email to get data');
    res.send(userInfo);
});

app.post('/addUser', async (req, res) => {
    Object.keys(req.body).length != 0 ? await addUser(req.body) : res.send('Please provide user data');
    res.send('New user has been added');    
});

app.post('/compress', async (req, res) => {
    var source;
    Object.keys(req.body).length != 0 ? source = tinify.fromUrl(req.body.url) : res.send('Please provide url');
    res.sendFile(path.resolve(__dirname, 'optimized.jpg'));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
