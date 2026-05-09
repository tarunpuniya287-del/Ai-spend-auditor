const express = require('express');
const { v4: uuidv4 } = require('uuid');
const AuditModel = require('../models/Audit');

const router = express.Router();
const auditModel = new AuditModel();

// POST /api/audits - Create new audit
router.post('/', async (req, res) => {
  try {
    const { id, formData, report } = req.body;

    if (!id || !formData || !report) {
      return res.status(400).json({
        success: false,
        error: 'id, formData, and report are required',
      });
    }

    const newAudit = await auditModel.create({
      id,
      formData,
      report,
    });

    res.status(201).json({
      success: true,
      audit: newAudit,
      message: 'Audit created successfully',
    });
  } catch (error) {
    console.error('Error creating audit:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create audit',
    });
  }
});

// GET /api/audits/:id - Get audit by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Audit ID is required',
      });
    }

    const audit = await auditModel.findById(id);

    if (!audit) {
      return res.status(404).json({
        success: false,
        error: 'Audit not found',
      });
    }

    res.json({
      success: true,
      audit,
    });
  } catch (error) {
    console.error('Error fetching audit:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch audit',
    });
  }
});

// GET /api/audits - Get all audits (paginated)
router.get('/', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 100, 1000);
    const skip = parseInt(req.query.skip) || 0;

    const audits = await auditModel.findAll(limit, skip);
    const total = await auditModel.count();

    res.json({
      success: true,
      data: {
        audits,
        total,
        limit,
        skip,
      },
    });
  } catch (error) {
    console.error('Error fetching audits:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch audits',
    });
  }
});

// PUT /api/audits/:id - Update audit
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Audit ID is required',
      });
    }

    const updatedAudit = await auditModel.update(id, updates);

    if (!updatedAudit) {
      return res.status(404).json({
        success: false,
        error: 'Audit not found',
      });
    }

    res.json({
      success: true,
      data: updatedAudit,
      message: 'Audit updated successfully',
    });
  } catch (error) {
    console.error('Error updating audit:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update audit',
    });
  }
});

// DELETE /api/audits/:id - Delete audit
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Audit ID is required',
      });
    }

    const deleted = await auditModel.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Audit not found',
      });
    }

    res.json({
      success: true,
      message: 'Audit deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting audit:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete audit',
    });
  }
});

module.exports = router;
