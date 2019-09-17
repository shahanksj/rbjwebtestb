const express = require('express');
const router = express.Router();


router.get('/metalTypeKT', (req, res) => {
    var dbFunctions = require('../models/metaltypekt')
    dbFunctions.getMetalTypeKT(req,res);
});

router.get('/metalTypeKT/:metalTypeKTId',(req,res)=>{

    var dbFunctions = require('../models/metaltypekt')
    dbFunctions.getMetalTypeKTById(req,res);

})

router.delete('/metalTypeKT/:metalTypeKTId',(req,res)=>{

    var dbFunctions = require('../models/metaltypekt')
    dbFunctions.deleteMetalTypeKTId(req,res);
})

router.post('/metalTypeKT/createmetalTypeKT',(req,res)=>{

    var dbFunctions = require('../models/metaltypekt')
    dbFunctions.createMetalTypeKT(req,res);
})

router.put('/metalTypeKT/:metalTypeKTId',(req,res)=>{
    var dbFunctions = require('../models/metaltypekt')
    dbFunctions.updateMetalTypeKT(req,res);
})

module.exports = router