const express = require('express');
const router = express.Router();


router.get('/vendorops', (req, res) => {
    var dbFunctions = require('../../models/accesory/vendorops')
    dbFunctions.getVendorOps(req,res);
});

router.get('/vendorops/:vendoropsId',(req,res)=>{

    var dbFunctions = require('../../models/accesory/vendorops')
    dbFunctions.getVendorOpsById(req,res);

})

router.delete('/vendorops/truncateVendorops',(req,res)=>{
    var dbFunctions = require('../../models/accesory/vendorops')
    dbFunctions.truncateVendorOps(req,res);
})


router.get('/vendorops/:rbjstyle',(req,res)=>{
    var dbFunctions = require('../../models/accesory/vendorops')
    dbFunctions.getVendorOpsByRbjStyle(req,res);
})


router.delete('/vendorops/:vendoropsId',(req,res)=>{

    var dbFunctions = require('../../models/accesory/vendorops')
    dbFunctions.deleteVendorOpsById(req,res);
})

router.post('/vendorops/generatevendorops',(req,res)=>{

    var dbFunctions = require('../../models/accesory/vendorops')
    dbFunctions.generateVendorOpsData(req,res);
})

router.put('/vendorops/:vendoropsId',(req,res)=>{
    var dbFunctions = require('../../models/accesory/vendorops')
    dbFunctions.updateVendorOps(req,res);
})

module.exports = router