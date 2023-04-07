const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const colors = require('colors');
const port = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(cors());

// routers
app.use('/auth', require('./routes/jwtAuth'));

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`.blue);
});
