const uploadFile = require("../middleware/upload.js");

module.exports = app => {
    const User_data = require("../controller/User_profile.controller.js");
    const Pool =require('pg').Pool
  
    var router = require("express").Router();
  
    // Create a new Citie
    router.post("/",uploadFile.single('image'), User_data.create);
  
    // Retrieve all User_data
    router.get("/", User_data.findAll);
  
    // Retrieve all published User_data
    router.get("/published", User_data.findAllPublished);
  
    // Retrieve a single Citie with id
    router.get("/:id", User_data.findOne);
  
    // Update a Citie with id
    router.put("/:id", User_data.update);
  
    // Delete a Citie with id
    router.delete("/:id", User_data.delete);
  
    // Delete all User_data
    router.delete("/", User_data.deleteAll);

    //login api
    app.post("/login",(res,req)=>{
      const email =req.body.email;
      const password = req.body.password;
      pool.query('SELECT * FROM users WHERE email = $1 AND password = $2',[email,password],(err,result)=>{
          if (err) {
              // console.log(err);
              res.send({err:err});
          }
          
          if(result.rows.length > 0){
              res.send(result);
          }else{
              res.send({message:"Wrong email and password"});1
          }
      })
    })
  
    app.use("/api/User_data", router);
  };
  