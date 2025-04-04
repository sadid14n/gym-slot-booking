const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const moment = require("moment");
const slotbookingModel = require("../models/slotModel");

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exist. Please login",
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new userModel(req.body);
    await newUser.save();

    res.status(200).send({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Registration Error`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User not found. Please register",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1D",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login Controller Error",
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    const hashedPassword =
      password && (await bcrypt.hash(password, await bcrypt.genSalt(10)));

    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Update Profile Controller Error",
    });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User not found. Please register",
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "getUserData Controller Error",
    });
  }
};

const bookingAvailabilityContorller = async (req, res) => {
  try {
    const { time } = req.body;
    const formattedTime = moment(time, "DD-MM-YYYY HH:mm");
    const toTime = moment(formattedTime).add(1, "hours");

    console.log("Formatted Time:", formattedTime.toISOString());
    console.log("To Time:", toTime.toISOString());

    const approvedBookings = await slotbookingModel.find({
      time: {
        $gte: formattedTime.toISOString(),
        $lt: toTime.toISOString(),
      },
      status: "approved",
    });
    console.log("Approved Bookings:", approvedBookings);

    if (approvedBookings.length >= 1) {
      return res.status(200).send({
        success: false,
        message: "Not Avialable",
      });
    } else {
      return res.status(200).send({
        message: "Available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Check Avilibility",
      error,
    });
  }
};
const slotBookingController = async (req, res) => {
  try {
    const { time } = req.body;
    const formattedTime = moment(time, "DD-MM-YYYY HH:mm").toISOString();
    req.body.time = formattedTime;
    req.body.status = "pending";
    const newSlot = new slotbookingModel(req.body);
    await newSlot.save();
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notifications.push({
      type: `Slot Booking Request`,
      message: `Your slot booking request on ${moment(
        time,
        "DD-MM-YYYY HH:mm"
      ).format("DD-MM-YYYY HH:mm")} has been send successfully`,
    });
    await user.save();

    const admin = await userModel.findOne({ isAdmin: true });
    admin.notifications.push({
      type: `Slot Booking Request`,
      message: `${user.name} request a slot on ${moment(
        time,
        "DD-MM-YYYY HH:mm"
      ).format("DD-MM-YYYY HH:mm")}`,
    });
    await admin.save();

    res.status(200).send({
      success: true,
      message:
        "Slot booking request send successfully. You can see the status of the request on slot list tab",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in checking availability",
      error,
    });
  }
};

// Mark All Read Notification Controller
const MarkAllReadNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const notifications = user.notifications;
    const seenNotifications = user.seenNotifications;
    seenNotifications.push(...notifications);
    user.notifications = [];
    user.seenNotifications = seenNotifications;
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All Notifications Marked As Read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in Mark All Read Notification Controller",
      success: false,
      error,
    });
  }
};

// Handle Delete All Notifications Controller
const deleteAllNotificationsController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in Delete All Notification Controller",
      success: false,
      error,
    });
  }
};

const slotBookingListController = async (req, res) => {
  try {
    const slotLists = await slotbookingModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "User Slots Fetched Successfully",
      data: slotLists,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in getting Slot Booking List Controller",
      success: false,
      error,
    });
  }
};
module.exports = {
  registerController,
  loginController,
  updateProfileController,
  authController,
  bookingAvailabilityContorller,
  slotBookingController,
  MarkAllReadNotificationController,
  deleteAllNotificationsController,
  slotBookingListController,
};
