const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDb = require('./config/connectDB');
connectDb()

const app = express();

// Config Use
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/order', require('./routes/order'));

const PORT = process.env.PORT || 5000
var server = app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`))
