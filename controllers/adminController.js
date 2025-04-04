const userModel = require("../models/userModel");
const slotbookingModel = require("../models/slotModel");

const adminSlotBookingListController = async (req, res) => {
  try {
    const admin = await userModel.findOne({ _id: req.body.userId });
    const slotList = await slotbookingModel.find({});
    res.status(200).send({
      success: true,
      message: "Slot list fetched successfully - admin",
      data: slotList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fatching Slot List Controller",
      error,
    });
  }
};

const handleStatusController = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointments = await slotbookingModel.findByIdAndUpdate(
      appointmentId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notifications;

    notification.push({
      type: "Slot Booking Status Updated",
      message: `Your Slot Booking Request has been ${status}`,
      onClickPath: "/user-slot-list",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Slot Booking Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Slot Status Controller",
      error,
    });
  }
};

module.exports = { adminSlotBookingListController, handleStatusController };
