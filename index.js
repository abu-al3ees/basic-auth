/* eslint-disable no-unused-vars */
'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
let server = require('../basic-auth/src/server');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(()=> {
    console.log('conntected to mongoDB');
    
  })
  .catch((err)=> console.log(err));
server.listen(process.env.PORT);
