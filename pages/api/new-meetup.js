import { MongoClient } from "mongodb"; // To connect MongoDB

// This function run when URL = "/api/new-meetup"
// If "/api/new-meetup" Receives a "POST" request
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body; // Get data

    const password = process.env.DB_PASSWORD;

    const client = await MongoClient.connect(
      `mongodb+srv://kaheno1312:${password}@cluster0.7uoo5.mongodb.net/meetups?retryWrites=true&w=majority`
    ); // Data from "config.env"

    // .db => Method To created our database as "meetups" (as we modified in "process.env.MONGO_USER")
    const db = client.db();

    const meetupsCollection = db.collection("meetups"); // "meetups" (collection was created when modified "process.env.MONGO_USER"

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close(); // close database connection

    res.status(201).json({
      message: "Meetup Inserted",
    });

    // Could use Try/Catch for error handling
  }
};

export default handler;
