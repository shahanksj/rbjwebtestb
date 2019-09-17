const express = require('express');
const router = express.Router();


router.get('/metalType', (req, res) => {
    var dbFunctions = require('../models/metaltype')
    dbFunctions.getMetalType(req,res);
});

router.get('/metalType/:metalTypeId',(req,res)=>{

    var dbFunctions = require('../models/metaltype')
    dbFunctions.getMetalTypeById(req,res);

})

router.delete('/metalType/:metalTypeId',(req,res)=>{

    var dbFunctions = require('../models/metaltype')
    dbFunctions.deleteMetalTypeId(req,res);
})

router.post('/metalType/createmetalType',(req,res)=>{

    var dbFunctions = require('../models/metaltype')
    dbFunctions.createMetalType(req,res);
})

router.put('/metalType/:metalTypeId',(req,res)=>{
    var dbFunctions = require('../models/metaltype')
    dbFunctions.updateMetalType(req,res);
})

module.exports = router