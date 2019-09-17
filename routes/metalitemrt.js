const express = require('express');
const router = express.Router();


router.get('/metalitem', (req, res) => {
    var dbFunctions = require('../models/metalitem')
    dbFunctions.getmetalItems(req,res);
});

router.get('/metalitem/:metalItemId',(req,res)=>{

    var dbFunctions = require('../models/metalitem')
    
    dbFunctions.getMetalItembyId(req,res);

})

router.get('/metalitemsearch/:metalItem',(req,res)=>{
    var dbFunctions = require('../models/metalitem')
    dbFunctions.getbyMetalItem(req,res)
})

router.delete('/metalitem/:metalItemId',(req,res)=>{

    var dbFunctions = require('../models/metalitem')
    dbFunctions.deleteMetalItembyId(req,res);
})

router.post('/metalitem/createMetalItem',(req,res)=>{

    var dbFunctions = require('../models/metalitem')
    dbFunctions.createMetalItem(req,res);
})

router.put('/metalitem/:metalItemId',(req,res)=>{
    var dbFunctions = require('../models/metalitem')
    dbFunctions.updateMetalItem(req,res);
})

module.exports = router