const express = require('express');
const rout = express.Router();
const controlOngs = require('./controllers/controlOngs');
const controlIncidents = require('./controllers/controlIncident');
const controlProfile=require('./controllers/controlProfile');
const controlSession=require('./controllers/controlSession');

rout.post('/session', controlSession.Login);

rout.post('/ongs', controlOngs.createOngs);
rout.get('/ongs', controlOngs.listOngs);

rout.get('/profile', controlProfile.listProfile);

rout.post('/incidents', controlIncidents.createIncident);
rout.get('/incidents', controlIncidents.listIncident);
rout.delete('/incidents/:id', controlIncidents.deleteIncident);

module.exports=rout;