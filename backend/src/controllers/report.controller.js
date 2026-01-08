import { ReportModel } from '../models/Report.js';

export const reportController = {
  // Create report
  create: async (req, res) => {
    try {
      const report = await ReportModel.create(req.user.userId, req.body);
      res.status(201).json({
        message: 'Report submitted',
        report
      });
    } catch (error) {
      console.error('Create report error:', error);
      res.status(500).json({ error: 'Failed to create report' });
    }
  },

  // Get all reports (admin)
  getAll: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const reports = await ReportModel.getAll(limit, offset);
      res.status(200).json(reports);
    } catch (error) {
      console.error('Get reports error:', error);
      res.status(500).json({ error: 'Failed to get reports' });
    }
  },

  // Get pending reports (admin)
  getPending: async (req, res) => {
    try {
      const reports = await ReportModel.getPending();
      res.status(200).json(reports);
    } catch (error) {
      console.error('Get pending reports error:', error);
      res.status(500).json({ error: 'Failed to get pending reports' });
    }
  },

  // Update report (admin)
  update: async (req, res) => {
    try {
      const report = await ReportModel.update(req.params.id, req.body);
      res.status(200).json({
        message: 'Report updated',
        report
      });
    } catch (error) {
      console.error('Update report error:', error);
      res.status(500).json({ error: 'Failed to update report' });
    }
  }
};
