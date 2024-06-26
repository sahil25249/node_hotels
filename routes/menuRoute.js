const express = require('express');
const router = express.Router();
const Menu = require('./../models/menu');

  router.post('/', async (req,res)=>{
    try{
      const data = req.body;
      const newMenu = new Menu(data);
    
      //Save the new peron data to the db
      const response = await newMenu.save();
      console.log('Menu data saved');
      res.status(200).json(response);
  
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
  })
  
  router.get('/', async (req,res) =>{
    
    try{
      const data = await Menu.find();
      console.log('Menu data fetched');
      res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
  })

  router.get('/:tasteType', async (req,res) =>{
    
    try{
        const tasteType = req.params.tasteType;
      if(tasteType =='sour' || tasteType == 'sweet' || tasteType == 'spicy')
        {
            const data = await Menu.find({taste: tasteType});
            console.log('Menu data fetched');
            res.status(200).json(data);
        }
        else{
            res.status(404).json({error:"Invalid taste"});
        }
      
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
  })

  router.put('/:id', async (req,res) => {
    try{
        const menuId = req.params.id;
        const menuData = req.body;
        const response = await Menu.findByIdAndUpdate(menuId, menuData, {
            new: true,
            runValidators: true
        })
        console.log("Menu data updated");
        res.status(200).json(response)
        if(!response){
          res.status(404).json({error:'Menu not found'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})

router.delete('/:id', async (req,res) => {
  try{
    const menuId = req.params.id;
    const response = await Menu.findByIdAndDelete(menuId);
    console.log("Menu deleted successfully")
    res.status(200).json(response)
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:"Internal Server Error"})
  }
})
module.exports = router;

