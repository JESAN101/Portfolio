import express from "express";
import protect from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import { contactLimiter } from "../middleware/rateLimiters.js";
import { messageValidator, readMessageValidator } from "../validators/messageValidator.js";
import {
  createMessage,
  getMessages,
  getMessage,
  setMessageRead,
  deleteMessage,
  deleteAllMessages,
  getMessageStats,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/", contactLimiter, messageValidator, validate, createMessage);

router.get("/", protect, getMessages);
router.get("/stats", protect, getMessageStats);
router.get("/:id", protect, getMessage);

router.patch(
  "/:id/read",
  protect,
  readMessageValidator,
  validate,
  setMessageRead
);

router.delete("/", protect, deleteAllMessages);
router.delete("/:id", protect, deleteMessage);

export default router;
