import WeightLog from '../model/weightLog.model.js';

// Add a new weight log
export const addWeightLog = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Create new weight log with the user id from auth middleware
    const weightLog = new WeightLog({
      ...req.body,
      user: userId
    });
    
    await weightLog.save();
    
    res.status(201).json({
      success: true,
      weightLog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all weight logs for a user
export const getUserWeightLogs = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Get optional query parameters for filtering
    const { startDate, endDate, limit = 10, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build query
    const query = { user: userId };
    
    if (startDate || endDate) {
      query.measuredAt = {};
      
      if (startDate) {
        query.measuredAt.$gte = new Date(startDate);
      }
      
      if (endDate) {
        query.measuredAt.$lte = new Date(endDate);
      }
    }
    
    // Get weight logs
    const weightLogs = await WeightLog.find(query)
      .sort({ measuredAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const totalCount = await WeightLog.countDocuments(query);
    
    res.status(200).json({
      success: true,
      weightLogs,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get a single weight log by id
export const getWeightLogById = async (req, res) => {
  try {
    const userId = req.userId;
    const weightLogId = req.params.id;
    
    const weightLog = await WeightLog.findOne({
      _id: weightLogId,
      user: userId
    });
    
    if (!weightLog) {
      return res.status(404).json({
        success: false,
        message: 'Weight log not found'
      });
    }
    
    res.status(200).json({
      success: true,
      weightLog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update a weight log
export const updateWeightLog = async (req, res) => {
  try {
    const userId = req.userId;
    const weightLogId = req.params.id;
    
    const weightLog = await WeightLog.findOneAndUpdate(
      {
        _id: weightLogId,
        user: userId
      },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!weightLog) {
      return res.status(404).json({
        success: false,
        message: 'Weight log not found'
      });
    }
    
    res.status(200).json({
      success: true,
      weightLog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a weight log
export const deleteWeightLog = async (req, res) => {
  try {
    const userId = req.userId;
    const weightLogId = req.params.id;
    
    const weightLog = await WeightLog.findOneAndDelete({
      _id: weightLogId,
      user: userId
    });
    
    if (!weightLog) {
      return res.status(404).json({
        success: false,
        message: 'Weight log not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Weight log deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get weight statistics
export const getWeightStatistics = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Get latest weight log
    const latestWeightLog = await WeightLog.findOne({ user: userId })
      .sort({ measuredAt: -1 });
    
    // Get first weight log (to calculate total progress)
    const firstWeightLog = await WeightLog.findOne({ user: userId })
      .sort({ measuredAt: 1 });
    
    // Calculate total weight change
    let totalChange = null;
    let percentageChange = null;
    
    if (latestWeightLog && firstWeightLog) {
      totalChange = latestWeightLog.weight.value - firstWeightLog.weight.value;
      percentageChange = (totalChange / firstWeightLog.weight.value) * 100;
    }
    
    // Get weekly average (last 4 entries)
    const recentLogs = await WeightLog.find({ user: userId })
      .sort({ measuredAt: -1 })
      .limit(4);
    
    let weeklyAverage = null;
    
    if (recentLogs.length > 0) {
      const sum = recentLogs.reduce((total, log) => total + log.weight.value, 0);
      weeklyAverage = sum / recentLogs.length;
    }
    
    res.status(200).json({
      success: true,
      statistics: {
        latestWeight: latestWeightLog ? latestWeightLog.weight : null,
        totalChange,
        percentageChange,
        weeklyAverage,
        unit: latestWeightLog ? latestWeightLog.weight.unit : null
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};