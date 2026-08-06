import {
  createCertificateService,
  getCertificatesService,
  getCertificateService,
  updateCertificateService,
  deleteCertificateService,
  uploadCertificateImageService,
  reorderCertificatesService,
} from "../services/certificateService.js";
import { sendError } from "../utils/sendError.js";
import { removeLocalFile } from "../utils/fileUtils.js";

export const createCertificate = async (req, res) => {
  try {
    const certificate = await createCertificateService(req.body);

    return res.status(201).json({
      success: true,
      message: "Certificate created successfully",
      data: certificate,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const getCertificates = async (req, res) => {
  try {
    const { data, pagination } = await getCertificatesService(req.query);

    return res.status(200).json({
      success: true,
      count: data.length,
      pagination,
      data,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const getCertificate = async (req, res) => {
  try {
    const certificate = await getCertificateService(req.params.id);

    return res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const certificate = await updateCertificateService(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Certificate updated successfully",
      data: certificate,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    await deleteCertificateService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const uploadCertificateImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const certificate = await uploadCertificateImageService(
      req.params.id,
      req.file.path
    );

    removeLocalFile(req.file.path);

    return res.status(200).json({
      success: true,
      message: "Certificate image updated successfully",
      data: certificate,
    });
  } catch (error) {
    removeLocalFile(req.file?.path);

    return sendError(res, error);
  }
};

export const reorderCertificates = async (req, res) => {
  try {
    const certificates = await reorderCertificatesService(req.body.items);

    return res.status(200).json({
      success: true,
      message: "Certificate order updated successfully",
      data: certificates,
    });
  } catch (error) {
    return sendError(res, error);
  }
};
