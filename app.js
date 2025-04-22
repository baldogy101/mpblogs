// Core modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config(); // Load environment variables

// Custom modules
const mainRoutes = require('./routes/mainRoutes');
const { requireAuth, checkUser } = require('./middlewares/middleware');

// Initialize app
const app = express();

// Middleware
app.use(helmet());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// View engine
app.set('view engine', 'ejs');

// Check for user on all routes
app.use(checkUser);

// Routes
app.get('/', (req, res) => {
  res.render('home', { page: 'Home', title: 'MPB' });
});

app.use(mainRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { page: '404', title: 'MPB' });
});

// MongoDB Connection & Server Start
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('[✅] Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`[🚀] Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
