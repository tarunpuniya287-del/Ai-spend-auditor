const { MongoClient } = require('mongodb');

let client = null;
let db = null;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB = process.env.MONGODB_DB || 'ai-spend-auditor';

async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    db = client.db(MONGODB_DB);

    // Initialize indexes
    await initializeIndexes(db);

    return db;
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    throw error;
  }
}

async function initializeIndexes(database) {
  try {
    // Audits collection indexes
    const auditsCollection = database.collection('audits');
    await auditsCollection.createIndex({ createdAt: -1 });
    await auditsCollection.createIndex({ id: 1 }, { unique: true });

    // Leads collection indexes
    const leadsCollection = database.collection('leads');
    await leadsCollection.createIndex({ email: 1 });
    await leadsCollection.createIndex({ auditId: 1 });
    await leadsCollection.createIndex({ createdAt: -1 });

    console.log('✅ Database indexes initialized');
  } catch (error) {
    console.error('⚠️ Error initializing indexes:', error);
    // Don't throw - indexes are not critical
  }
}

function getDatabase() {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return db;
}

async function closeDatabase() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('✅ Disconnected from MongoDB');
  }
}

module.exports = {
  connectToDatabase,
  getDatabase,
  closeDatabase,
  initializeIndexes
};
