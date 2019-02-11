var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/ajax");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

var userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    mobile: Number
});

var user = mongoose.model("user", userSchema);



app.get("/", (req, res) => {
    user.find({}, function(err, data){
        if (err) {
            console.log("Error in showing the users data!");
        } else {
            res.render("abc", {data: data});
        }
    });
});


app.post("/", (req, res) => {
   user.create(req.body.data, function(err, data) {
       if (err) {
           console.log("Error in creating the user");
       } else {
           res.redirect("/");
            console.log(" creating the user");
       }
   }) ;
});



app.delete("/:id", (req, res) => {
   user.findByIdAndRemove(req.params.id, function(err, data){
     if (err) {
         console.log("error In deleting the user");
     } else {
         res.redirect("/");
     }  
   });
});


app.put("/:id", function(req, res){
    user.findByIdAndUpdate(req.params.id, req.body.data, function(err, data){
        if  (err) {
            console.log("Error in Editing the user");
        } else {
            console.log("User edited successfully");
            res.redirect("/");
        }
    });
});



app.listen(process.env.PORT, function(){
    console.log("Server is listening on port: "+ process.env.PORT);
});