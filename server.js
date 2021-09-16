// Dependencies 
const express = require('express');
const fs = require('fs');
const path = require('path')

// Init express 
const app = express();
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

//Routes for file 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.post('/api/notes', (req, res) => {
    
    const {title, text} = req.body;
    const newNote = {
        title,
        text,
        id: Math.floor((Math.random() * 1000))
    }

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if(err){
            console.log(err);
        } else {
            const parsedNotes = JSON.parse(data);

            parsedNotes.push(newNote);

            fs.writeFile('./db/db.json', 
                JSON.stringify(parsedNotes, null, 4), 
                (writeErr) =>
            writeErr ? console.error(writeErr) : console.info('Successfully updated Notes')
        )}    
    })
    res.status(201).json();
});

app.delete("/api/notes/:id", (req, res) => {
    const requestedId = req.params.id
    console.log(requestedId);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        let parsedData = JSON.parse(data);
        
        for (let i = 0; i < parsedData.length; i++){
           if (requestedId == parsedData[i].id){
               parsedData.splice(i, 1);
                fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4),
                (writeErr) => writeErr ? console.error(writeErr) : console.info("Successfully Deleted & Updated"))
            res.status(201).json();
           } else {
            res.status(404).json({ message: "Channel you are looking for does not exist"});
           }
       }
    })
});

// Route for Universal HTML
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Listen PORT
app.listen(PORt, () => 
    console.log(`listening at http://localhost:${PORT}`)
);
