const express = require('express');
const utilityRoutes = require('./src/routes/utilityRoutes');
const app = express();
const port = 8888;

// Define a default route for the root path ("/")
app.get('/searchassistAnswering', (req, res) => {
  res.send('Welcome to the utility API!');
});

// Mount the utility routes
app.use('/searchassistAnswering', utilityRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});