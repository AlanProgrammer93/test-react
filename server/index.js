const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Config Use
app.use(cors());
app.use(express.json());


// Routes

const PORT = process.env.PORT || 5000
var server = app.listen(PORT, () => console.log(`Server running port ${PORT}`))
