
const express = require('express');
const uuid = require('uuid');
const user  = require('../user');
const routes = express.Router();

// Get all user data
routes.get('/',(req, res)=>{
    res.json(user);
});

//  Get user y id
routes.get('/:id',( req, res)=>{
    const found = user.some((user)=>user.id === parseInt( req.params.id));
    
    if(found){
        res.json(user.filter((user)=> user.id === parseInt(req.params.id)));
    }else{
        res.sendStatus(400);
    }
});

// Create a new user
routes.post('/',(req, res)=>{
    const newUser = {
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email
    }

    if(!newUser.name || !newUser.email){
        res.sendStatus(400);
    }
    user.push(newUser);

    res.json(user);
});

// Update user
routes.put('/:id', (req, res)=>{
    const found = user.some((user) =>user.id === parseInt(req.params.id));
    
    if(found){
        const updateUser = req.body;
        
        user.forEach(user => {
            user.name =updateUser.name ? updateUser.name: user.name,
            user.email = updateUser.email ? updateUser.email : user.email

            res.json({message :"user updated ", user});
            console.log(user);
        })
    }else{
        res.sendStatus(400);
    }
});

// Delete user
routes.delete('/:id', (req, res)=>{
    const found = user.some((user)=> user.id === parseInt(req.params.id));
    console.log(found);

    if(found){
       const userdata= user.filter((user) => user.id !== parseInt(req.params.id));
        console.log(userdata);
        res.json({message:"user deleted",userdata});
    }else{
     
        res.sendStatus(400);
    }
});

module.exports= routes;  