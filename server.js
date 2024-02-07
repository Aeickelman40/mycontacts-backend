const express = require('express');
const dotenv = require('dotenv').config()

const errorHandler = require('./middleware/errorHandler');

const app = express();

const port = process.env.port || 8001

app.use(express.json())

app.use('/api/contacts', require('./routes/contactRoutes'))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})