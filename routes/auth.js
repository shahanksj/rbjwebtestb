const express = require('express');

const router = express.Router();

router.post('/login',(req,res)=>{

    var dbFunctions = require('../models/users')
    dbFunctions.loginUser(req,res)
})

router.get('/users', (req, res) => {
    var dbFunctions = require('../models/users')
    dbFunctions.getUsers(req,res)
});

router.get('/users/:id',(req,res)=>{

    var dbFunctions = require('../models/users')
    dbFunctions.getUserbyId(req,res)

})

router.delete('/users/:id',(req,res)=>{

    var dbFunctions = require('../models/users')
    dbFunctions.deleteUserbyId(req,res)
})

router.post('/users/createUser',(req,res)=>{

    var dbFunctions = require('../models/users')
    dbFunctions.createUser(req,res)
})

router.put('/users/:id',(req,res)=>{
    var dbFunctions = require('../models/users')
    dbFunctions.updateUser(req,res)
})

module.exports = router