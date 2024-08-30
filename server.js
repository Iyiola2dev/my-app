const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to check working hours
function checkWorkingHours(req, res, next) {
  const currentDate = new Date();
  const day = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = currentDate.getHours(); // 0 to 23

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Within working hours
  } else {
    res.status(403).send('The service is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
}

// Apply the working hours middleware to all routes
app.use(checkWorkingHours);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route handlers
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'services.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
