const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()




const uri = `mongodb+srv://supportive_instructor:supportive_instructor@cluster0.ostva.mongodb.net/supportive_raihan?retryWrites=true&w=majority`;
const port = 4000
const app = express()
app.use(bodyParser.json());
app.use(cors());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("supportive_raihan").collection("give_support");

  app.post('/addjobs', (req, res) => {
    const products = req.body;
    collection.insertOne(products)
      .then(result => {

        res.send(result.insertedCount > 0)
      })
  })
  app.get('/jobs', (req, res) => {
    collection.find({})
      .toArray((err, document) => {
        res.send(document)
      })
  })

  console.log("sarver started")
});


app.listen(process.env.PORT || port)