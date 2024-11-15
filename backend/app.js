// backend/server.js
const express = require('express');
const app = express();
const cors=require('cors')
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}))

require('dotenv').config()
const PORT=process.env.PORT

//DB Connection
require('./db/connection')


// Router path
const todoRoute = require('./routers/todo');
app.use('/',todoRoute);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
