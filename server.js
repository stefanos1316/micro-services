const express = require('express')
const mongodb = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/socialDatabase';
const app = express();

app.use(express.json());
const port = 3000;

async function getUser(credentials) {
    let db = await mongodb.connect(url);
    if (await db.authenticate(credentials.name, credentials.password)) {
        let thing = await db.collection("Things").findOne({ name: "bob" });
        await db.close();
        return thing;
    }
}

async function addUser(info) {
    let db = await mongodb.connect(url);
    await db.collection('users').insertOne(info);
    await db.close;
}

app.get('/sum', (req, res) => {
    var total = (req.query.a - 0) + (req.query.b - 0); 
    res.send('The answer is ' + total);
});

app.post('/addUser', (req, res) => {
    Object.keys(req.body).length != 0 ? addUser(req.body) : res.send('Please provide user data');
    res.send('New user has been added');    
});

// curl --request POST --url "http://localhost:3000/addUser" --header 'content-type: application/json' --data '{"name": "stefanos"}'

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
