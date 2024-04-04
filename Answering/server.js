const express = require('express');
const utilityRoutes = require('./src/routes/utilityRoutes');
const app = express();
const port = 3000;

// Define a default route for the root path ("/")
app.get('/', (req, res) => {
  res.send('Welcome to the utility API!');
});

// Mount the utility routes
app.use('/searchassistapi', utilityRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});