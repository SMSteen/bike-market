const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const regEx = new RegExp('\\.js$', 'i') //regex to capture only .js files

//connect mongodb
mongoose.connect('mongodb://localhost/bike_mkt');
mongoose.connection.on('connected', () => console.log('MongoDB connected'));

//read all files in models folder and require each .js file
const modelsPath = path.join(__dirname, '../models');
fs.readdirSync(modelsPath).forEach(function(file) {
    if(regEx.test(file)) { //found a file, require it
        require(path.join(modelsPath, file));
    }
})