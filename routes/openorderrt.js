const express = require('express');
const router = express.Router();


router.get('/openorder', (req, res) => {
    var dbFunctions = require('../models/openorder')
    dbFunctions.getOpenOrder(req,res);
});

router.get('/openorder/:openorderId',(req,res)=>{

    var dbFunctions = require('../models/openorder')
    
    dbFunctions.getOpenorderById(req,res);

})

router.delete('/openorder/truncateopenorder',(req,res)=>{
    var dbFunctions = require('../models/openorder')
    dbFunctions.truncateOpenorder(req,res);
})


router.get('/openorderitem/:item_id',(req,res)=>{
    var dbFunctions = require('../models/openorder')
    dbFunctions.getOpenorderByItem(req,res);
})

router.delete('/openorder/:openorderId',(req,res)=>{

    var dbFunctions = require('../models/openorder')
    dbFunctions.deleteopenorderById(req,res);
})

router.post('/openorder/generateopenorderData',(req,res)=>{

    var dbFunctions = require('../models/openorder')
    dbFunctions.generateOpenorderData(req,res);
})

router.put('/openorder/:openorderId',(req,res)=>{
    var dbFunctions = require('../models/openorder')
    dbFunctions.updateOpenorder(req,res);
})

module.exports = router