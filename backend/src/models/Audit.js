const { getDatabase } = require('../config/mongodb');

class AuditModel {
  constructor() {
    this.collectionName = 'audits';
  }

  getCollection() {
    const db = getDatabase();
    return db.collection(this.collectionName);
  }

  async create(audit) {
    const now = new Date();
    const auditWithTimestamps = {
      ...audit,
      createdAt: now,
      updatedAt: now,
    };

    const collection = this.getCollection();
    const result = await collection.insertOne(auditWithTimestamps);

    if (!result.insertedId) {
      throw new Error('Failed to create audit');
    }

    return auditWithTimestamps;
  }

  async findById(id) {
    const collection = this.getCollection();
    const audit = await collection.findOne({ id });
    return audit || null;
  }

  async findAll(limit = 100, skip = 0) {
    const collection = this.getCollection();
    const audits = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .toArray();

    return audits;
  }

  async update(id, updates) {
    const collection = this.getCollection();
    const result = await collection.findOneAndUpdate(
      { id },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    return result.value || null;
  }

  async delete(id) {
    const collection = this.getCollection();
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
  }

  async count() {
    const collection = this.getCollection();
    return await collection.countDocuments();
  }
}

module.exports = AuditModel;
