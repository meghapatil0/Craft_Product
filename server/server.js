const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
app.use(bodyParser.json());
 
const conn = mysql.createConnection({
        "host": "localhost",
        "port": 3306,
        "user": "root",
        "password": "",
        "database": "tbl_craft_product"
});
 
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
//show all products
app.get('/products',(req, res) => {
  let sql = "SELECT * FROM craft_product";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//add new product
app.post('/products',(req, res) => {
  let data = {product_name: req.body.product_name, product_price: req.body.product_price};
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
app.listen(4000,() =>{
  console.log('Server started on port 4000...');
});