// serve data from database
const express = require('express');
const router = express.Router();

const documents = { } 

// Create a new active document
router.get('/', (req, res) => {
  console.log('ROUTE: /document/')
  res.send('Connected to the API')
});