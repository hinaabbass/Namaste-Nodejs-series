const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://namastenode:uExwFCpySNUdfEd6@namastenode.cfifddn.mongodb.net/";
const client = new MongoClient(url);

const dbName = "HelloWorld";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collection = db.collection("User");

  //Create (Insert Data)
  const data = {
    firstname: "Akshay",
    lastname: "Saini",
    city: "Dehradun",
    phoneNumber: "98345678",
  };

  const insertData = await collection.insertMany([data]);
  console.log("Data inserted:", insertData);

  //Read (Fetch Data)
  const findData = await collection.find({}).toArray();
  console.log("All data:", findData);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
