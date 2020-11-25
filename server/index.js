const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const PORT = 4000;
const cors=require('cors');
const url = "mongodb://localhost:27017";
const dbName = "ProductDB";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var jsonParser = bodyParser.json();
app.use(bodyParser.json());
MongoClient.connect(url, function (err, client) {
  console.log("Connected successfully to server");

  const dbo = client.db(dbName);
  
  app.get("/product", (request, response) => {
    dbo
      .collection("ProductCollection")
      .find({})
      .toArray((error, result) => {
        if (error) {
          return response.status(500).send(error);
        }
        response.setHeader("content-type", "application/json");
        response.send(result);
      });
  });
  app.get("/product", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        console.log('result',result)
        response.send(result);
    });
  });

  //post api
  app.post("/product", jsonParser, function (req, response) {
    console.log(req)
    dbo
      .collection("ProductCollection")
      .insertOne(req.body, function (err, result) {
        if (err) throw err;
        console.log("1 document inserted");
        response.setHeader("content-type", "application/json");
        response.send(result);
      });
  });

  app.use(function (user, req, res, next) {
    res.status(200).send(user);
  });
});

app.listen(PORT, () => {
  console.log("listen application on port number 4000");
});
