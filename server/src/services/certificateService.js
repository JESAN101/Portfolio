import Certificate from "../models/Certificate.js";
import { AppError } from "../utils/AppError.js";
import { paginate } from "../utils/queryBuilder.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "./cloudinaryService.js";

const SEARCHABLE = ["title", "issuer", "description", "credentialId"];
const FILTERABLE = ["isActive"];
const BOOLEAN_FIELDS = ["isActive"];
const SORTABLE = {
  createdAt: 1,
  updatedAt: 1,
  title: 1,
  issuedDate: 1,
  order: 1,
};

export const createCertificateService = async (data) => {
  return Certificate.create(data);
};

export const getCertificatesService = async (query = {}) => {
  return paginate(Certificate, query, {
    searchable: SEARCHABLE,
    filterable: FILTERABLE,
    booleanFields: BOOLEAN_FIELDS,
    sortable: SORTABLE,
  });
};

export const getCertificateService = async (id) => {
  const certificate = await Certificate.findById(id);

  if (!certificate) throw new AppError("Certificate not found", 404);

  return certificate;
};

export const updateCertificateService = async (id, data) => {
  const certificate = await Certificate.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!certificate) throw new AppError("Certificate not found", 404);

  return certificate;
};

export const deleteCertificateService = async (id) => {
  const certificate = await Certificate.findByIdAndDelete(id);

  if (!certificate) throw new AppError("Certificate not found", 404);

  if (certificate.imagePublicId) {
    await deleteFromCloudinary(certificate.imagePublicId);
  }

  return certificate;
};

export const uploadCertificateImageService = async (id, filePath) => {
  const certificate = await Certificate.findById(id);

  if (!certificate) throw new AppError("Certificate not found", 404);

  const uploaded = await uploadToCloudinary(filePath, {
    folder: "portfolio/certificates",
    resource_type: "image",
  });

  const previousPublicId = certificate.imagePublicId;

  certificate.image = uploaded.url;
  certificate.imagePublicId = uploaded.publicId;
  await certificate.save();

  if (previousPublicId) {
    await deleteFromCloudinary(previousPublicId);
  }

  return certificate;
};

export const reorderCertificatesService = async (items = []) => {
  const operations = items.map((item) => ({
    updateOne: {
      filter: { _id: item.id },
      update: { $set: { order: item.order } },
    },
  }));

  if (operations.length) {
    await Certificate.bulkWrite(operations);
  }

  return Certificate.find().sort({ order: 1, createdAt: 1 });
};
