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
  mongoose.set('strictQuery', false);

  // 1. Attempt connection to primary configured URI
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (primaryErr) {
    console.warn(`[Database Warning] Could not connect to primary MongoDB at ${mongoUri}`);
    console.warn(`[Database Warning] Reason: ${primaryErr.message}`);

    // 2. If primary was remote Atlas, automatically attempt fallback to local MongoDB instance
    if (mongoUri.includes('mongodb+srv://') || !mongoUri.includes('127.0.0.1')) {
      try {
        console.log('[Database] Attempting connection to local MongoDB (mongodb://127.0.0.1:27017/rk_foundation)...');
        const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/rk_foundation', {
          serverSelectionTimeoutMS: 3000,
        });
        console.log(`[Database] Connected to Local MongoDB: ${localConn.connection.host}/${localConn.connection.name}`);
        return localConn;
      } catch (localErr) {
        console.warn(`[Database Warning] Local MongoDB at 127.0.0.1:27017 is also offline.`);
      }
    }

    // 3. In development, attempt MongoMemoryServer if available
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
        console.warn('[Database Warning] In-Memory MongoDB could not be spawned on this system.');
      }
    }

    // 4. Disable command buffering so queries don't hang for 10s if DB remains down
    mongoose.set('bufferCommands', false);

    console.error(`
=============================================================================
[DATABASE CONNECTION NOTICE]
MongoDB could not be reached. Two easy ways to fix this:

OPTION 1: Whitelist your IP on MongoDB Atlas (Recommended for Cloud DB)
  1. Open https://cloud.mongodb.com/
  2. Go to: Security -> Network Access -> IP Access List
  3. Click "+ Add IP Address" -> Select "Allow Access from Anywhere" (0.0.0.0/0)
     or click "Add Current IP Address" -> Confirm.

OPTION 2: Use Local MongoDB on Windows (Offline / Local Dev)
  1. Open Command Prompt or PowerShell as Administrator and run:
     net start MongoDB
  2. In your server/.env file, change MONGODB_URI to:
     MONGODB_URI=mongodb://127.0.0.1:27017/rk_foundation
=============================================================================
`);

    throw primaryErr;
  }
};
