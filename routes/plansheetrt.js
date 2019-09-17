const express = require('express');
const router = express.Router();


router.get('/plansheet', (req, res) => {
    var dbFunctions = require('../models/plansheet')
    dbFunctions.getPlansheetData(req,res);
});

router.get('/plansheet/:plansheetId',(req,res)=>{

    var dbFunctions = require('../models/plansheet')
    
    dbFunctions.getPlansheetById(req,res);

})

router.delete('/plansheet/truncatePlan',(req,res)=>{
    var dbFunctions = require('../models/plansheet')
    dbFunctions.truncatePlansheet(req,res);
})


router.get('/plansheetitem/:item_id',(req,res)=>{
    var dbFunctions = require('../models/plansheet')
    dbFunctions.getPlansheetByItem(req,res);
})

router.delete('/plansheet/:plansheetId',(req,res)=>{

    var dbFunctions = require('../models/plansheet')
    dbFunctions.deletePlansheetById(req,res);
})

router.post('/plansheet/generatePlansheetData',(req,res)=>{

    var dbFunctions = require('../models/plansheet')
    dbFunctions.generatePlansheetData(req,res);
})

router.put('/plansheet/:plansheetId',(req,res)=>{
    var dbFunctions = require('../models/plansheet')
    dbFunctions.updatePlansheet(req,res);
})

module.exports = router