import express from "express";
import protect from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import upload from "../middleware/uploadMiddleware.js";
import { reorderValidator } from "../validators/commonValidators.js";
import {
  certificateValidator,
  updateCertificateValidator,
} from "../validators/certificateValidator.js";
import {
  createCertificate,
  getCertificates,
  getCertificate,
  updateCertificate,
  deleteCertificate,
  uploadCertificateImage,
  reorderCertificates,
} from "../controllers/certificateController.js";

const router = express.Router();

router.get("/", getCertificates);
router.get("/:id", getCertificate);

router.put("/reorder", protect, reorderValidator, validate, reorderCertificates);

router.post("/", protect, certificateValidator, validate, createCertificate);
router.put("/:id", protect, updateCertificateValidator, validate, updateCertificate);
router.delete("/:id", protect, deleteCertificate);

router.post(
  "/:id/image",
  protect,
  upload.single("file"),
  uploadCertificateImage
);

export default router;
