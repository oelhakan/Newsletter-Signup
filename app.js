const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const data ={
    members : [
      {
        email_address : req.body.eMail,
        status : "subscribed",
        merge_fields : {
          FNAME : req.body.firstName,
          LNAME : req.body.lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = '';

  const options  = {
    method : "post",
    auth: "onur:"
  }

  const request = https.request(url, options, function(response){
    if(response.statusCode == "200"){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }

      response.on("data", function(data){
        console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});
