// Dependencies 
const express = require('express');
const fs = require('fs');
const path = require('path')

// Init express 
const app = express();
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

//Routes for file 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})


