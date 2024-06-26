const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

//post method to send data to db
router.post('/', async (req, res) =>{
    try{
      const data = req.body; //assuming the reuest body contains the person data
  
      //create a new person document using mongoose model
      const newPerson = new Person(data);
    
      //Save the new peron data to the db
      const response = await newPerson.save();
      console.log('New Person data saved');
      res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: "Internal Server Error"});
    }
  
  })
  
  //get method to fetch data
  router.get('/', async (req,res) => {
    try{
      const data = await Person.find();
      console.log('Data fetched');
      res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
  });

  router.get('/:workType', async (req,res) => {
    try{
        const workType = req.params.workType;  //Extract the work type from url
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter')
            {
                const data = await Person.find({work: workType});
                console.log(data[this.name])
                console.log('Data fetched');
                res.status(200).json(data);
            }
        else{
            res.status(404).json({error:'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
  })
  
router.put('/:id', async (req,res)=>{
  try{
    const personId = req.params.id; //Extract the person's id fom the url parameter
    const updatePersonData = req.body; //Updated date for the person

    //Assuming you have a person model
    const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
      new: true, //return the updated document
      runValidators: true //run mongoose validation
    });

    console.log('data updated');
    res.status(200).json(response)

    if(!response){
      return res.status(404).json({error: 'Person not found'});
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
})

router.delete('/:id', async (req,res) => {
  try{
    const personId = req.params.id;//Extract the person's id fom the url parameter
    const response = await Person.findByIdAndDelete(personId); //Assuming you have a person model
    console.log("Person Deleted Successfully");
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:"Internal server error"});
  }
})
  module.exports = router;