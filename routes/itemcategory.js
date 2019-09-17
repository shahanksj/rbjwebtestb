const express = require('express');
const router = express.Router();


router.get('/itemcategory', (req, res) => {
    var dbFunctions = require('../models/itemcategory')
    dbFunctions.getItemCategorys(req,res);
});

router.get('/itemcategory/:itemCategoryId',(req,res)=>{

    var dbFunctions = require('../models/itemcategory')
    dbFunctions.getItemCategoryById(req,res);

})

router.delete('/itemcategory/:itemCategoryId',(req,res)=>{

    var dbFunctions = require('../models/itemcategory')
    dbFunctions.deleteItemCategoryId(req,res);
})

router.post('/itemcategory/createitemCategory',(req,res)=>{

    var dbFunctions = require('../models/itemcategory')
    dbFunctions.createItemCategory(req,res);
})

router.put('/itemcategory/:itemCategoryId',(req,res)=>{
    var dbFunctions = require('../models/itemcategory')
    dbFunctions.updateItemCategory(req,res);
})

module.exports = router