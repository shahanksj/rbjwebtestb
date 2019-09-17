const express = require('express');
const router = express.Router();


router.get('/itemassemblytypes', (req, res) => {
    var dbFunctions = require('../models/itemassemblytypes')
    dbFunctions.getItemAssemblyTypes(req,res);
});

router.get('/itemassemblytypes/:itemAssemblyId',(req,res)=>{

    var dbFunctions = require('../models/itemassemblytypes')
    dbFunctions.getItemAssemblyTypesbyId(req,res);

})

router.delete('/itemassemblytypes/:itemAssemblyId',(req,res)=>{

    var dbFunctions = require('../models/itemassemblytypes')
    dbFunctions.deleteItemAssemblyTypesbyId(req,res);
})

router.post('/itemassemblytypes/createitemassemblytypes',(req,res)=>{

    var dbFunctions = require('../models/itemassemblytypes')
    dbFunctions.createItemAssemblyTypes(req,res);
})

router.put('/itemassemblytypes/:itemAssemblyId',(req,res)=>{
    var dbFunctions = require('../models/itemassemblytypes')
    dbFunctions.updateItemAssemblyTypes(req,res);
})

module.exports = router