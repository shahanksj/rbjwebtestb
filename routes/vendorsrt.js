const express = require('express');
const router = express.Router();


router.get('/vendors', (req, res) => {
    var dbFunctions = require('../models/vendors')
    dbFunctions.getVendors(req,res);
});

router.get('/vendors/:vendorId',(req,res)=>{

    var dbFunctions = require('../models/vendors')
    
    dbFunctions.getVendorById(req,res);

})

router.get('/vendors/:vendorName',(req,res)=>{
    var dbFunctions = require('../models/vendors')
    dbFunctions.getVendorName(req,res)
})

router.delete('/vendors/:vendorId',(req,res)=>{

    var dbFunctions = require('../models/vendors')
    dbFunctions.deleteVenorbyId(req,res);
})

router.post('/vendors/createVendor',(req,res)=>{

    var dbFunctions = require('../models/vendors')
    dbFunctions.createVendor(req,res);
})

router.put('/vendors/:vendorId',(req,res)=>{
    var dbFunctions = require('../models/vendors')
    dbFunctions.updateVendor(req,res);
})

module.exports = router