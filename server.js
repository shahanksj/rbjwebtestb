
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');


var auth = require('./routes/auth')
var itemassemblytypes = require('./routes/itemassemblytypesrt')
var metalitem = require('./routes/metalitemrt')
var itemcategory = require('./routes/itemcategory')
var itemcategorytype = require('./routes/itemcategorytype')
var metaltype = require('./routes/metaltypert')
var metaltypekt= require('./routes/metaltypektrt')
var metalcolor = require('./routes/metalcolorrt')
var vendor = require('./routes/vendorsrt')
var plansheet = require('./routes/plansheetrt')
var openorder = require('./routes/openorderrt')
var semiandfinish = require('./routes/accessory/semiandfinishrt')
var diasandweb = require('./routes/accessory/diasandwebstylert')
var vendorops = require('./routes/accessory/vendoropsrt')
var castingandfinish = require('./routes/accessory/castingandfinishrt')


app.use( bodyparser.json({limit: '50mb'}) );
app.use(bodyparser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));
app.use(cors());

app.use('/auth',auth)
app.use('/stylemaster',itemassemblytypes)
app.use('/stylemaster',metalitem)
app.use('/stylemaster',itemcategory)
app.use('/stylemaster',itemcategorytype)
app.use('/stylemaster',metaltype)
app.use('/stylemaster',metaltypekt)
app.use('/stylemaster',metalcolor)
app.use('/purchase',vendor)
app.use('/accessory',plansheet)
app.use('/accessory',openorder)
app.use('/accessory',semiandfinish)
app.use('/accessory',diasandweb)
app.use('/accessory',vendorops)
app.use('/accessory',castingandfinish)


app.listen(9000, () => console.log('Express server is runnig at port no : 9000'));