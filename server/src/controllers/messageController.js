import {
  createMessageService,
  getMessagesService,
  getMessageService,
  setMessageReadService,
  deleteMessageService,
  deleteAllMessagesService,
  getMessageStatsService,
} from "../services/messageService.js";
import { sendError } from "../utils/sendError.js";

export const createMessage = async (req, res) => {
  try {
    const message = await createMessageService(req.body);

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { data, pagination } = await getMessagesService(req.query);

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

export const getMessage = async (req, res) => {
  try {
    const message = await getMessageService(req.params.id);

    return res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const setMessageRead = async (req, res) => {
  try {
    const message = await setMessageReadService(
      req.params.id,
      req.body.read !== undefined ? req.body.read : true
    );

    return res.status(200).json({
      success: true,
      message: `Message marked as ${message.read ? "read" : "unread"}`,
      data: message,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const deleteMessage = async (req, res) => {
  try {
    await deleteMessageService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const deleteAllMessages = async (req, res) => {
  try {
    const deletedCount = await deleteAllMessagesService();

    return res.status(200).json({
      success: true,
      message: `${deletedCount} message(s) deleted successfully`,
      deletedCount,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const getMessageStats = async (req, res) => {
  try {
    const stats = await getMessageStatsService();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    return sendError(res, error);
  }
};
