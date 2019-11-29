const express = require('express');
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path')
const app = express();

app.use(express.json())


var uploadFile = express.Router();
app.use('/', uploadFile);
require('./uploadFile')(uploadFile, multer, multerS3, aws, path)




app.listen(2000, () => {
    console.log('Your app is listening prot',2000)
})