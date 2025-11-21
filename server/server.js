require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// CORS Middleware - Apply to ALL requests
app.use((req, res, next) => {
  console.log(`🔄 ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Expose-Headers', 'Content-Range, X-Content-Range');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('✅ Handling OPTIONS preflight request');
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
console.log('🔄 Starting MongoDB connection...');
console.log('MongoDB URI present:', !!process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI environment variable is missing!');
} else {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
  })
  .catch((error) => {
    console.error('❌ MongoDB Connection Error:', error.message);
  });
}

// Routes
app.use('/api/todos', require('./routes/todoroutes'));

// Health check route
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    status: 'Server is running', 
    database: dbStatus,
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Database status endpoint
app.get('/api/db-status', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected', 
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({
    database: statusMap[dbStatus] || 'unknown',
    readyState: dbStatus,
    mongoUriConfigured: !!process.env.MONGO_URI
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working with CORS!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: error.message || 'Internal Server Error'
  });
});

module.exports = app;