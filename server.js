const express = require('express');
const dotenv = require('dotenv').config()

const app = express();

const port = process.env.port || 8000

app.use('/api/contacts', require('./routes/contactRoutes'))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})