const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/User.routes')
const app = express();

app.use(bodyParser.json());

// Add Swagger middleware
require('./swagger')(app);

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/users').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Define routes
app.use('/api/users', routes);

app.listen(process.env.port || 3002, () => {
  console.log(`Server running on port ${3002}`);
});
