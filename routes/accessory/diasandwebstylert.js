const express = require('express');
const router = express.Router();


router.get('/diasandwebstyle', (req, res) => {
    var dbFunctions = require('../../models/accesory/diasparkandwebstyle')
    dbFunctions.getDiasandWebStyle(req,res);
});

router.get('/diasandwebstyle/:diasandwebstyleId',(req,res)=>{

    var dbFunctions = require('../../models/accesory/diasparkandwebstyle')
    dbFunctions.getDiasandWebById(req,res);

})

router.delete('/diasandwebstyle/:diasandwebstyleId',(req,res)=>{

    var dbFunctions = require('../../models/accesory/diasparkandwebstyle')
    dbFunctions.deleteDiasandWebId(req,res);
})

router.post('/diasandwebstyle/creatediasandwebstyle',(req,res)=>{

    var dbFunctions = require('../../models/accesory/diasparkandwebstyle')
    dbFunctions.createDiasandWebStyle(req,res);
})

router.put('/diasandwebstyle/:diasandwebstyleId',(req,res)=>{
    var dbFunctions = require('../../models/accesory/diasparkandwebstyle')
    dbFunctions.updateDiasandWebStyle(req,res);
})

module.exports = router