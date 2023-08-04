const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

// moddleware
app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ebwgrc3.mongodb.net/?retryWrites=true&w=majority`;


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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const tasksCollection = client.db('taskManager').collection('tasks')


    // save a new task data
    app.post('/add-task', async (req, res) => {
      const newTaskData = req.body;
      // console.log(newTaskData);
      const result = await tasksCollection.insertOne(newTaskData);
      res.send(result);
    })



    // get all tasks
    app.get('/tasks', async (req, res) => {
      // console.log(req.query.email);
      const query = {userEmail: req.query.email}
      const result = await tasksCollection.find(query).toArray();
      res.send(result);
    })


    // to delete a single task
    app.delete('/tasks/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await tasksCollection.deleteOne(query);
      res.send(result);
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
  res.send('Hello server')
})

app.listen(port, () => {
  console.log(`task manager is running at ${port} port`);
})