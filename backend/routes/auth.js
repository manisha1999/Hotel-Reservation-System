const express = require('express')
const router = express.Router();
const User = require('../models/User')


const { body, validationResult } = require('express-validator');





router.post("/register", async (req, res) => {
    const { name,email,password} = req.body


    try {

       
       
            const newuser = new User({
                name: name,
                email: email,
                password:password,
                
            })
            const user = await newuser.save();
            
           
        
        res.send('USer registered successfully')
        

  
    }
    catch (error) {
      
        return res.status(400).json({ error });
    }

})


router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    try{
       const user = await User.findOne({email : email,password :password})
       if(user){
          const temp = {
             name : user.name,
             email : user.email
          }
          res.send(temp)
       }
   
    }catch(error){
        return res.status(400).json({error});
    }
})


module.exports = router