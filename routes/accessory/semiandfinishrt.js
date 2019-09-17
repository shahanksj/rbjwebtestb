const express = require('express');
const router = express.Router();


router.get('/semiandfinish', (req, res) => {
    var dbFunctions = require('../../models/accesory/semiandfinish')
    dbFunctions.getSemiandFinishList(req,res);
});

router.get('/semiandfinish/:semiandfinishpojoId',(req,res)=>{

    var dbFunctions = require('../../models/accesory/semiandfinish')
    dbFunctions.getSemiandFinishbyId(req,res);

})

router.delete('/semiandfinish/:semiandfinishpojoId',(req,res)=>{

    var dbFunctions = require('../../models/accesory/semiandfinish')
    dbFunctions.deleteSemiandFinishbyId(req,res);
})

router.post('/semiandfinish/createsemiandfinish',(req,res)=>{

    var dbFunctions = require('../../models/accesory/semiandfinish')
    dbFunctions.createSemiandFinishList(req,res);
})

router.put('/semiandfinish/:semiandfinishpojoId',(req,res)=>{
    var dbFunctions = require('../../models/accesory/semiandfinish')
    dbFunctions.updateSemiandFinish(req,res);
})

module.exports = router