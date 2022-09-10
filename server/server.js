const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const todoRouter = require('./routes/to.do.router');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES 
app.use('/todo', todoRouter);

// START LISTENING:
app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });

// MAKING SURE SERVER.JS IS RUNNING.
console.log(`SERVER.JS IS RUNNING!!!`);