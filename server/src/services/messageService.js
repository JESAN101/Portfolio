import Message from "../models/Message.js";
import { AppError } from "../utils/AppError.js";
import { paginate } from "../utils/queryBuilder.js";

const SEARCHABLE = ["name", "email", "subject", "message"];
const FILTERABLE = ["read"];
const BOOLEAN_FIELDS = ["read"];
const SORTABLE = {
  createdAt: 1,
  updatedAt: 1,
  name: 1,
  email: 1,
};

export const createMessageService = async (data) => {
  return Message.create(data);
};

export const getMessagesService = async (query = {}) => {
  return paginate(Message, query, {
    searchable: SEARCHABLE,
    filterable: FILTERABLE,
    booleanFields: BOOLEAN_FIELDS,
    sortable: SORTABLE,
  });
};

export const getMessageService = async (id) => {
  const message = await Message.findById(id);

  if (!message) throw new AppError("Message not found", 404);

  return message;
};

export const setMessageReadService = async (id, read) => {
  const message = await Message.findById(id);

  if (!message) throw new AppError("Message not found", 404);

  message.read = Boolean(read);
  message.readAt = message.read ? new Date() : null;

  await message.save();

  return message;
};

export const deleteMessageService = async (id) => {
  const message = await Message.findByIdAndDelete(id);

  if (!message) throw new AppError("Message not found", 404);

  return message;
};

export const deleteAllMessagesService = async () => {
  const result = await Message.deleteMany({});

  return result.deletedCount;
};

export const getMessageStatsService = async () => {
  const [total, read, unread] = await Promise.all([
    Message.countDocuments(),
    Message.countDocuments({ read: true }),
    Message.countDocuments({ read: false }),
  ]);

  return { total, read, unread };
};
