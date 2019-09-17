const express = require('express');
const router = express.Router();


router.get('/metalcolor', (req, res) => {
    var dbFunctions = require('../models/metalcolor')
    dbFunctions.getMetalColors(req,res);
});

router.get('/metalcolor/:metalColorId',(req,res)=>{

    var dbFunctions = require('../models/metalcolor')
    dbFunctions.getMetalColorById(req,res);

})

router.delete('/metalcolor/:metalColorId',(req,res)=>{

    var dbFunctions = require('../models/metalcolor')
    dbFunctions.deleteMetalColorById(req,res);
})

router.post('/metalcolor/createmetalcolor',(req,res)=>{

    var dbFunctions = require('../models/metalcolor')
    dbFunctions.createMetalColor(req,res);
})

router.put('/metalcolor/:metalColorId',(req,res)=>{
    var dbFunctions = require('../models/metalcolor')
    dbFunctions.updateMetalColor(req,res);
})

module.exports = router