require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

// Mongo DB Connections
const client = new MongoClient(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Middleware Connections
app.use(cors());
app.use(express.json());

// Main Route
app.get("/", (req, res) => {
  res.send("API Server is Running");
});

async function run() {
  const volunteerCollection = client
    .db("charityVolunteer")
    .collection("volunteers");
  try {
    app.get("/volunteer", async (req, res) => {
      const query = {};
      const cursor = volunteerCollection.find(query);
      const volunteer = await cursor.toArray();
      res.send(volunteer);
    });
  } finally {
  }
}

run().catch((err) => console.error(err));

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});
