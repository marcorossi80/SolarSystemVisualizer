const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, 'client')));

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});