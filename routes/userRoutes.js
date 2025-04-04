const express = require("express");
const {
  registerController,
  loginController,
  authController,
  bookingAvailabilityContorller,
  slotBookingController,
  MarkAllReadNotificationController,
  deleteAllNotificationsController,
  slotBookingListController,
  updateProfileController,
} = require("../controllers/userControllers");

const authMiddleware = require("../middlewares/authMiddlewares");

const router = express.Router();

// Register || POST
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/update-profile", updateProfileController);

// GET USER DATA || POST
router.post("/getUserData", authMiddleware, authController);
router.post(
  "/slot-availability",
  authMiddleware,
  bookingAvailabilityContorller
);
router.post("/slot-booking", authMiddleware, slotBookingController);

// Mark All Read Notification
router.post(
  "/mark-all-read-notifications",
  authMiddleware,
  MarkAllReadNotificationController
);

// Handel Delere All Notifications
router.post(
  "/delete-all-notifications",
  authMiddleware,
  deleteAllNotificationsController
);

router.post(
  "/getting-slot-list-for-user",
  authMiddleware,
  slotBookingListController
);

module.exports = router;
