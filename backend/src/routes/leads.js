const express = require('express');
const { v4: uuidv4 } = require('uuid');
const LeadModel = require('../models/Lead');

const router = express.Router();
const leadModel = new LeadModel();

// POST /api/leads - Create new lead
router.post('/', async (req, res) => {
  try {
    const { email, company, auditId } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required',
      });
    }

    if (!auditId) {
      return res.status(400).json({
        success: false,
        error: 'Audit ID is required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }

    // Check if lead already exists
    const existingLead = await leadModel.findByEmail(email);
    if (existingLead) {
      return res.status(409).json({
        success: false,
        error: 'Lead with this email already exists',
      });
    }

    const newLead = await leadModel.create({
      id: uuidv4(),
      email: email.toLowerCase(),
      company: company || undefined,
      auditId,
    });

    res.status(201).json({
      success: true,
      data: newLead,
      message: 'Lead created successfully',
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create lead',
    });
  }
});

// GET /api/leads/:id - Get lead by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Lead ID is required',
      });
    }

    const lead = await leadModel.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found',
      });
    }

    res.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lead',
    });
  }
});

// GET /api/leads - Get all leads (paginated)
router.get('/', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 100, 1000);
    const skip = parseInt(req.query.skip) || 0;

    const leads = await leadModel.findAll(limit, skip);
    const total = await leadModel.count();

    res.json({
      success: true,
      data: {
        leads,
        total,
        limit,
        skip,
      },
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leads',
    });
  }
});

// GET /api/leads/audit/:auditId - Get leads by audit ID
router.get('/audit/:auditId', async (req, res) => {
  try {
    const { auditId } = req.params;

    if (!auditId) {
      return res.status(400).json({
        success: false,
        error: 'Audit ID is required',
      });
    }

    const leads = await leadModel.findByAuditId(auditId);

    res.json({
      success: true,
      data: leads,
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leads',
    });
  }
});

// PUT /api/leads/:id - Update lead
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Lead ID is required',
      });
    }

    const updatedLead = await leadModel.update(id, updates);

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found',
      });
    }

    res.json({
      success: true,
      data: updatedLead,
      message: 'Lead updated successfully',
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update lead',
    });
  }
});

// DELETE /api/leads/:id - Delete lead
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Lead ID is required',
      });
    }

    const deleted = await leadModel.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found',
      });
    }

    res.json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete lead',
    });
  }
});

module.exports = router;
