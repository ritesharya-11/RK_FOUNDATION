import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`====================================================`);
    console.log(`  RK FOUNDATION Backend API Server`);
    console.log(`  Status: Running on http://localhost:${PORT}`);
    console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`====================================================`);
  });

  try {
    await connectDB();
  } catch (err) {
    console.error(`[Database Error] Connection failed: ${err.message}`);
  }

  process.on('unhandledRejection', (err) => {
    console.error(`[Unhandled Rejection] Error: ${err.message}`);
    if (process.env.NODE_ENV === 'production') {
      server.close(() => process.exit(1));
    }
  });
};

startServer();
