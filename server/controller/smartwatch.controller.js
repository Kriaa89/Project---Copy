import { createSmartwatchIntegration } from '../services/smartwatch.service.js';
import User from '../model/user.model.js';

// Connect a smartwatch to the user account
export const connectSmartwatch = async (req, res) => {
  try {
    const userId = req.userId;
    const { type, accessToken } = req.body;
    
    // Validate input
    if (!type) {
      return res.status(400).json({
        success: false,
        message: 'Smartwatch type is required'
      });
    }
    
    // Check if supported smartwatch type
    if (!['Apple Watch', 'Fitbit', 'Garmin'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Unsupported smartwatch type'
      });
    }
    
    // Create integration instance
    const smartwatchIntegration = createSmartwatchIntegration(userId, type);
    
    // Connect to smartwatch service
    const result = await smartwatchIntegration.connect(accessToken);
    
    res.status(200).json({
      success: true,
      message: `Connected to ${type} successfully`,
      data: result
    });
  } catch (error) {
    console.error('Error connecting smartwatch:', error);
    res.status(500).json({
      success: false,
      message: 'Error connecting smartwatch',
      error: error.message
    });
  }
};

// Disconnect a smartwatch from the user account
export const disconnectSmartwatch = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Get user to check current smartwatch
    const user = await User.findById(userId);
    
    if (!user || !user.smartwatchConnected) {
      return res.status(400).json({
        success: false,
        message: 'No smartwatch connected'
      });
    }
    
    // Create integration instance
    const smartwatchIntegration = createSmartwatchIntegration(userId, user.smartwatchType);
    
    // Disconnect from smartwatch service
    const result = await smartwatchIntegration.disconnect();
    
    res.status(200).json({
      success: true,
      message: `Disconnected from ${user.smartwatchType} successfully`,
      data: result
    });
  } catch (error) {
    console.error('Error disconnecting smartwatch:', error);
    res.status(500).json({
      success: false,
      message: 'Error disconnecting smartwatch',
      error: error.message
    });
  }
};

// Sync workouts from connected smartwatch
export const syncSmartwatch = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Get user to check current smartwatch
    const user = await User.findById(userId);
    
    if (!user || !user.smartwatchConnected) {
      return res.status(400).json({
        success: false,
        message: 'No smartwatch connected'
      });
    }
    
    // Create integration instance
    const smartwatchIntegration = createSmartwatchIntegration(userId, user.smartwatchType);
    
    // Sync workouts from smartwatch
    const result = await smartwatchIntegration.syncWorkouts();
    
    res.status(200).json({
      success: true,
      message: `Synced workouts from ${user.smartwatchType} successfully`,
      importCount: result.importCount
    });
  } catch (error) {
    console.error('Error syncing workouts from smartwatch:', error);
    res.status(500).json({
      success: false,
      message: 'Error syncing workouts from smartwatch',
      error: error.message
    });
  }
};

// Get smartwatch connection status
export const getSmartwatchStatus = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Get user to check smartwatch status
    const user = await User.findById(userId).select('smartwatchConnected smartwatchType');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      smartwatchStatus: {
        connected: user.smartwatchConnected || false,
        type: user.smartwatchType || 'None'
      }
    });
  } catch (error) {
    console.error('Error getting smartwatch status:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting smartwatch status',
      error: error.message
    });
  }
};