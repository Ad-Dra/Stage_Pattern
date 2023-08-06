const express = require("express");
const app = express();
const usersRoute = require('./routes/route.js');

app.use('/', usersRoute);
app.listen(1000);