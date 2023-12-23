const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var cors = require('cors')
require('dotenv').config();
const app = express()
const port = process.env.PORT||5000

app.use(cors())
app.use(express.json())

//taskUser
//UviPtR6XbNX3xGvG

const uri = "mongodb+srv://taskUser:UviPtR6XbNX3xGvG@cluster0.5qjioco.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    
     client.connect();
     const cartsCollection = client.db('task').collection('carts');
     app.get('/carts', async (req, res) => {
        const email = req.query.email;
        if (!email) {
          res.send([])
        }
        let query = { email: email };
      const result = await cartsCollection.find(query).toArray();
        res.send(result);
      })
     app.post('/carts', async (req, res) => {
        const cart = req.body;
        console.log(cart)
        const result = await cartsCollection.insertOne(cart);
        res.send(result)
      })











    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('task is running!')
})

app.listen(port, () => {
  console.log(`task running on port ${port}`)
})