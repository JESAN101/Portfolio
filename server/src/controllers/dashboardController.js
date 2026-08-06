import { getDashboardStatsService } from "../services/dashboardService.js";
import { sendError } from "../utils/sendError.js";

export const getDashboardStats = async (req, res) => {
  try {
    const data = await getDashboardStatsService();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return sendError(res, error);
  }
};
