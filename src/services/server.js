const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000; // Or any port you prefer

app.use(bodyParser.json());

// This is a very simple in-memory store for emails - NOT FOR PRODUCTION
// For production, use a database (PostgreSQL, MongoDB, Firebase) or an Email Marketing Service API
let subscribers = [];

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // Basic validation
    return res.status(400).json({ message: 'Invalid email address provided.' });
  }

  if (subscribers.includes(email)) {
    return res.status(200).json({ message: 'You are already subscribed!' }); // Or 409 Conflict
  }

  subscribers.push(email);
  console.log('New subscriber:', email);
  console.log('All subscribers:', subscribers);

  // TODO: Here you would integrate with an email sending service (SendGrid, Mailgun, Nodemailer with SMTP)
  // to send a welcome email, or store it more permanently.

  // For now, just a success response
  res.status(201).json({ message: 'Subscription successful! We will keep you updated.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});