const express = require('express');
const router = express.Router();


router.get('/castingandfinish', (req, res) => {
    var dbFunctions = require('../../models/accesory/castingandfinish')
    dbFunctions.getCastingAndFinishStyles(req,res);
});

router.get('/castingandfinish/:castingandfinishpojoId',(req,res)=>{

    var dbFunctions = require('../../models/accesory/castingandfinish')
    dbFunctions.getCastingAndFinishById(req,res);

})

router.delete('/castingandfinish/:castingandfinishpojoId',(req,res)=>{

    var dbFunctions = require('../../models/accesory/castingandfinish')
    dbFunctions.deleteCastingAndFinishbyId(req,res);
})

router.post('/castingandfinish/createcastingandfinish',(req,res)=>{

    var dbFunctions = require('../../models/accesory/castingandfinish')
    dbFunctions.createCastingAndFinish(req,res);
})

router.put('/castingandfinish/:castingandfinishpojoId',(req,res)=>{
    var dbFunctions = require('../../models/accesory/castingandfinish')
    dbFunctions.updateCastingAndFinish(req,res);
})

module.exports = router