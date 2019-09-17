const express = require('express');
const router = express.Router();


router.get('/itemcategorytype', (req, res) => {
    var dbFunctions = require('../models/itemcategorytype')
    dbFunctions.getItemCategoryTypes(req,res);
});

router.get('/itemcategorytype/:itemCategoryTypeId',(req,res)=>{

    var dbFunctions = require('../models/itemcategorytype')
    dbFunctions.getItemCategoryTypesById(req,res);

})

router.delete('/itemcategorytype/:itemCategoryTypeId',(req,res)=>{

    var dbFunctions = require('../models/itemcategorytype')
    dbFunctions.deleteItemCategoryTypeId(req,res);
})

router.post('/itemcategorytype/createitemCategoryType',(req,res)=>{

    var dbFunctions = require('../models/itemcategorytype')
    dbFunctions.createItemCategoryType(req,res);
})

router.put('/itemcategorytype/:itemCategoryTypeId',(req,res)=>{
    var dbFunctions = require('../models/itemcategorytype')
    dbFunctions.updateItemCategoryType(req,res);
})

module.exports = router