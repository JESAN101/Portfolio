import { uploadAndCleanupLocalFile } from "../services/cloudinaryService.js";
import { sendError } from "../utils/sendError.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await uploadAndCleanupLocalFile(req.file.path, {
      folder: "portfolio",
      resource_type: "auto",
    });

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: result.url,
        publicId: result.publicId,
      },
    });
  } catch (error) {
    return sendError(res, error);
  }
};
