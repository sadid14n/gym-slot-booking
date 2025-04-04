const express = require("express");
const authMiddleware = require("../middlewares/authMiddlewares");
const {
  adminSlotBookingListController,
  handleStatusController,
} = require("../controllers/adminController");
const router = express.Router();

// Get SLot List for Admin
router.get("/admin-slot-list", authMiddleware, adminSlotBookingListController);

// Slot Booking Status Updated
router.post(
  "/admin-slot-list-status-update",
  authMiddleware,
  handleStatusController
);

module.exports = router;
