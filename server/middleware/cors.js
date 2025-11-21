const cors = require("cors");

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://todo-backend-4wnv7gaze-kipkoech-88s-projects.vercel.app',
      'https://project-frontend-keylrtgo6-kipkoech-88s-projects.vercel.app',
    ];
    
    // Allow all subdomains of vercel.app in production
    if (allowedOrigins.includes(origin) || 
        origin.endsWith('.vercel.app') || 
        process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      console.log('CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
};

module.exports = cors(corsOptions);