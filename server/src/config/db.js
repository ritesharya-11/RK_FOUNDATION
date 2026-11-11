import mongoose from 'mongoose';
import dns from 'dns';

// Solve ISP / Windows DNS SRV lookup refusal (querySrv ECONNREFUSED) for MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (dnsErr) {
  // ignore if restricted
}

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rk_foundation';

  try {
    // Attempt standard connection to the configured MONGODB_URI
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (primaryErr) {
    console.warn(`[Database Warning] Could not connect to primary MongoDB at ${mongoUri} (${primaryErr.message}).`);
    
    // In development/testing environments, fall back to mongodb-memory-server for instant zero-config startup
    if (process.env.NODE_ENV !== 'production') {
      try {
        console.log('[Database] Initializing in-memory MongoDB server for development...');
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        const memUri = mongod.getUri();
        const conn = await mongoose.connect(memUri);
        console.log(`[Database] In-Memory MongoDB running at: ${memUri}`);
        return conn;
      } catch (memErr) {
        console.error('[Database Error] In-Memory MongoDB failed to initialize:', memErr.message);
        throw primaryErr;
      }
    } else {
      throw primaryErr;
    }
  }
};
