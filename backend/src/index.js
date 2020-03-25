const express = require('express');
const rout = require('./routes');
const cors = require('cors');
const app=express();

app.use(express.json());
app.use(rout);
app.use(cors());

app.listen(3333);