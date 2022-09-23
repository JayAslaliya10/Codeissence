const express=require('express')
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('./models/user')
const app=express()

ACCOUNT_SID="AC7cfae453d585e28499d880d5be57a23a"
AUTH_TOKEN="faf98efdb591887d3a252b0215cabee2"
const twilio = require('twilio')(ACCOUNT_SID,AUTH_TOKEN)

app.use(express.json())


const mongoURI = "mongodb+srv://abc:abc@cluster0.225dbiz.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoURI,()=>{
    console.log('connected to DB');

})


app.post('/register',async(req, res)=>{
    let success = false;
  
      try{
        let user = await User.findOne({email : req.body.email});
  
        if(user){
          res.status(400).json({success, error:"Email ID already used"})
        }
  
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
  
        user = await User.create({
          name : req.body.name,
          phone : req.body.phone,
          email : req.body.email,
          password : secPass,
          address: req.body.address,
        })
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
    })


app.post('/login',async(req,res)=>{
    let success = false
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.status(400).json({result}, {erros : errors.array()})
    }

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



app.get("/fire",(req,res)=>{

    // var client=new twilio(ACCOUNT_SID,AUTH_TOKEN);

    twilio.messages.create({
        body: `There is a fire outbreak ${req.body.inputBox}. Be careful and be safe`,
        to:"+917021437655",
        from:"+15095162458"
    }).then(msg=>{
        console.log('message sent successfully');
    }).catch(err=>{
        console.log(err);
    })
})



app.listen(3000,()=>{
    console.log('listening to port 8000');
})