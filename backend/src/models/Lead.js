const { getDatabase } = require('../config/mongodb');

class LeadModel {
  constructor() {
    this.collectionName = 'leads';
  }

  getCollection() {
    const db = getDatabase();
    return db.collection(this.collectionName);
  }

  async create(lead) {
    const now = new Date();
    const leadWithTimestamps = {
      ...lead,
      createdAt: now,
      updatedAt: now,
    };

    const collection = this.getCollection();
    const result = await collection.insertOne(leadWithTimestamps);

    if (!result.insertedId) {
      throw new Error('Failed to create lead');
    }

    return leadWithTimestamps;
  }

  async findById(id) {
    const collection = this.getCollection();
    const lead = await collection.findOne({ id });
    return lead || null;
  }

  async findByEmail(email) {
    const collection = this.getCollection();
    const lead = await collection.findOne({ email: email.toLowerCase() });
    return lead || null;
  }

  async findByAuditId(auditId) {
    const collection = this.getCollection();
    const leads = await collection
      .find({ auditId })
      .sort({ createdAt: -1 })
      .toArray();

    return leads;
  }

  async findAll(limit = 100, skip = 0) {
    const collection = this.getCollection();
    const leads = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .toArray();

    return leads;
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

  async countByAuditId(auditId) {
    const collection = this.getCollection();
    return await collection.countDocuments({ auditId });
  }
}

module.exports = LeadModel;
