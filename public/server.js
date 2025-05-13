// server.js (Conceptual Example)
const express = require('express');
const bodyParser = require('body-parser'); // To parse JSON request bodies
const fs = require('fs'); // File system module for basic storage (for demo only)
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Port for the backend server

// Middleware
app.use(bodyParser.json()); // To handle JSON data from the frontend
app.use(express.static(path.join(__dirname, 'public'))); // Assuming your index.html is in a 'public' folder

// --- In-memory or File-based storage (for demonstration ONLY) ---
// For production, use a database (PostgreSQL, MongoDB, etc.) or an Email Marketing Service.
const SUBSCRIBERS_FILE = path.join(__dirname, 'subscribers.json');

function getSubscribers() {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const data = fs.readFileSync(SUBSCRIBERS_FILE);
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading subscribers file:', error);
  }
  return [];
}

function saveSubscriber(email) {
  const subscribers = getSubscribers();
  if (!subscribers.includes(email)) {
    subscribers.push(email);
    try {
      fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing subscribers file:', error);
      return false;
    }
  }
  return false; // Email already exists
}
// --- End of Demo Storage ---


// API Endpoint for subscribing
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  // --- Basic Server-Side Validation ---
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Keep consistent with frontend or use a more robust library
  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }
  // --- End Validation ---

  // --- Save the email (using the demo storage function) ---
  console.log(`Received subscription request for: ${email}`);
  
  // Check if email already exists (optional, depends on your logic)
  const existingSubscribers = getSubscribers();
  if (existingSubscribers.includes(email)) {
    return res.status(200).json({ message: 'You are already subscribed!' }); // Or 409 Conflict
  }

  const saved = saveSubscriber(email);
  if (saved) {
    // --- TODO: Optionally send a confirmation email here ---
    // (e.g., using Nodemailer and an SMTP service or an email API like SendGrid)
    // For example: sendConfirmationEmail(email);

    return res.status(201).json({ message: 'Subscription successful! Welcome aboard.' });
  } else {
    // This else block might be hit if writing to file fails or if email already existed and wasn't caught above
    return res.status(500).json({ message: 'Subscription failed. Please try again.' });
  }
});

// Serve your index.html (if not using a separate web server for static files)
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});