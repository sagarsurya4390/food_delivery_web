const express = require('express');
const mongoDB = require('./db');
const CreateUser = require('./routes/CreateUser');
const DisplayData = require("./routes/DisplayData")
const OrderData = require("./routes/OrderData")
const cors = require('cors');  // Using the `cors` package is simpler

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoDB();

// CORS Middleware (using the `cors` package to handle all CORS cases)
app.use(cors({
  origin: "*",  // Only allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
  credentials: true
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the CreateUser route
app.use('/api', CreateUser);
app.use('/api', DisplayData);
app.use('/api', OrderData);



// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
