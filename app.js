const express=require('express')
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const bodyParser = require("body-parser");
const jwt=require('jsonwebtoken')
const ejs = require("ejs");
const User=require('./models/user')
const emergencyDesc=require('./models/emergencydesc')
const app=express()

ACCOUNT_SID="AC7cfae453d585e28499d880d5be57a23a"
AUTH_TOKEN="8e457010af2e69808c6261dfb64838d2"
const twilio = require('twilio')(ACCOUNT_SID,AUTH_TOKEN)

app.use(express.json())

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const mongoURI = "mongodb+srv://abc:abc@cluster0.225dbiz.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoURI,()=>{
    console.log('connected to DB');
})

var numberslist =[]



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
// app.post("/crime", function (req, res) {
//     res.render("crime");
// });
// app.post("/calamity", function (req, res) {
//     res.render("calamity");
// });
// app.get("/signup", function (req, res) {
//     res.render("signup");
// });
// app.post("/fire",function(req,res){
//     res.render("fire");
//     const user = new User({
//         description: req.body.description,
//         contact: req.body.contact,
//         address:req.body.address
//       });
// });

// app.post("/health",function(req,res){
//     res.render("health");
// });

app.get('/signup',async(req,res)=>{
    res.render("signup")
})

app.post('/signup',async(req, res)=>{
    let success = false;
  
      try{
        let user = await User.findOne({email : req.body.email});
  
        if(user){
          res.status(400).json({success, error:"Email ID already used"})
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
  
        user = await User.create({
          name : req.body.txt,
          email : req.body.email,
          password : req.body.pswd,
        })

        numberslist.push(String(req.body.phone))

        const data = {
          user: {
            id:user.id
          }
        }
  
        const authToken = jwt.sign(data, "jay");
  
        success = true
        res.json({success, authToken})
      }catch(err){
        console.log(err);
        res.json({status : 'error', error : err})
      }

      res.render("signup")
    })


app.post('/login',async(req,res)=>{
    let success = false
    try{
      let user = await User.findOne({ email : req.body.email})
      if(!user){
        res.status(400).json({success, error: "Enter valid credentials"})
      }

      const passwordCompare =  await bcrypt.compare(req.body.password, user.password)

      
      if (!passwordCompare){
        success = false
        res.status(400).json({success, error: "Enter valid credentials"})
      }

      const data = {
        user: {
          id:user.id
        }
      }
  
      const authtoken = jwt.sign(data, "jay")
      success = true
      res.json({success, authtoken});

    }catch (err){
      console.log(err.message);
      res.status(500).send("Some error occured")
    }
})



app.post("/fire",(req,res)=>{
    sendnotif=()=>{
        const numbers=["+917021437655","+918104720577"]
    Promise.all(
        numbers.map(number=>{
            twilio.messages.create({
                body: `There is a fire outbreak ${req.body.inputBox}. Be careful and be safe`,
                to:number,
                from:"+15095162458"
            })
            // console.log(number);
        })
    ).then(msg=>{
        console.log('message sent successfully');
    }).catch(err=>{
        console.log(err);
    })

    desc=emergencyDesc.create({
        description:req.body.Description,
        contact:req.body.Contact,
        address:req.body.Address
    })
    }

    res.render("fire")

})



app.post("/crime",(req,res)=>{

    // twilio.messages.create({
    //     body: `A crime has occured at ${req.body.inputBox}. Beware and be safe`,
    //     to:"+917021437655",
    //     from:"+15095162458"
    // }).then(msg=>{
    //     console.log('message sent successfully');
    // }).catch(err=>{
    //     console.log(err);
    // })

    sendnotif=()=>{
        const numbers=["+917021437655","+918104720577"]
    Promise.all(
        numbers.map(number=>{
            twilio.messages.create({
                body: `There is a crime at ${req.body.inputBox}. Be careful and be safe`,
                to:number,
                from:"+15095162458"
            })
            // console.log(number);
        })
    ).then(msg=>{
        console.log('message sent successfully');
    }).catch(err=>{
        console.log(err);
    })

    desc=emergencyDesc.create({
        description:req.body.Description,
        contact:req.body.Contact,
        address:req.body.Address
    })
    }

    res.render("crime")
})


app.post("/health",(req,res)=>{

    // twilio.messages.create({
    //     body: `There is a health emergency at ${req.body.inputBox}. Please help the respective in any manner possible`,
    //     to:"+917021437655",
    //     from:"+15095162458"
    // }).then(msg=>{
    //     console.log('message sent successfully');
    // }).catch(err=>{
    //     console.log(err);
    // })
    sendnotif=()=>{
        const numbers=["+917021437655","+918104720577"]
    Promise.all(
        numbers.map(number=>{
            twilio.messages.create({
                body: `There is a health emergency ${req.body.inputBox}. Be careful and be safe`,
                to:number,
                from:"+15095162458"
            })
            // console.log(number);
        })
    ).then(msg=>{
        console.log('message sent successfully');
    }).catch(err=>{
        console.log(err);
    })

    desc=emergencyDesc.create({
        description:req.body.Description,
        contact:req.body.Contact,
        address:req.body.Address
    })
    }

    res.render("health")
})


app.post("/calamity",(req,res)=>{

    // twilio.messages.create({
    //     body: `There has been a calamity at ${req.body.inputBox}. Please help the people of area in any way possible`,
    //     to:"+917021437655",
    //     from:"+15095162458"
    // }).then(msg=>{
    //     console.log('message sent successfully');
    // }).catch(err=>{
    //     console.log(err);
    // })

    sendnotif=()=>{
        const numbers=["+917021437655","+918104720577"]
    Promise.all(
        numbers.map(number=>{
            twilio.messages.create({
                body: `There is a calamity occured at ${req.body.inputBox}. Be careful and be safe`,
                to:number,
                from:"+15095162458"
            })
            // console.log(number);
        })
    ).then(msg=>{
        console.log('message sent successfully');
    }).catch(err=>{
        console.log(err);
    })

    desc=emergencyDesc.create({
        description:req.body.Description,
        contact:req.body.Contact,
        address:req.body.Address
    })
    }

    res.render("calamity")
})


app.listen(3000,()=>{
    console.log('listening to port 3000');
})
