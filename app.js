
//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose=require("mongoose");


var twilio=require('twilio');   
var accountSid = "ACcaca11fc101c73f5fbc854f8bb7d49b1"; // Your Account SID from www.twilio.com/console
var authToken ="853ae72af4a5b37834bc0022a53c11fc"; 
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/dataaDB", {
    useNewUrlParser:true, 
});
const userSchema=new mongoose.Schema({
    description:{type: String},
    contact:{type: String },
    address:{type: String},
});

const User=mongoose.model("User", userSchema);


app.get("/", function (req, res) {
    res.render("home");
});
app.get("/home", function (req, res) {
    res.render("home");
});

app.get("/community", function (req, res) {
    res.render("community");
});

app.get("/donate", function (req, res) {
    res.render("donate");
});

app.get("/aboutus",function(req,res){
    res.render("aboutus");
});
app.get("/contact", function (req, res) {
    res.render("contact");
});
app.post("/crime", function (req, res) {
    res.render("crime");
});
app.post("/calamity", function (req, res) {
    res.render("calamity");
});
app.get("/signup", function (req, res) {
    res.render("signup");
});
app.post("/fire",function(req,res){
    res.render("fire");
    const user = new User({
        description: req.body.description,
        contact: req.body.contact,
        address:req.body.address
      });
});

app.post("/health",function(req,res){
    res.render("health");
});
// app.get("/aboutus",function(req,res){
//     var client=new twilio(accountSid,authToken);
//     client.messages.create({
//         body: ",we have a new shelter in your area.Please help us to find stray dogs ",
//         to:"8104720577",
//         from:"+18148460647"
//     },(err,message)=>{
//         console.log(message.sid);
//     }
//     )

// });


app.listen(3000, function () {
    console.log("server started on port 3000");
});