require('dotenv').config();
const express = require('express');
const corsMiddleware = require('./middleware/cors');
const todoRoutes = require('./routes/todoroutes');

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', todoRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// 404 handler - FIXED for Express 5: Remove the '*' parameter
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal Server Error'
  });
});

module.exports = app;