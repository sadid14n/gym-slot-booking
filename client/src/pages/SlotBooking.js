import React, { useEffect, useState } from "react";
import Layout from "./../component/Layout";
import { DatePicker, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { setAvailable } from "../redux/features/slotSlice";
import moment from "moment";
import axios from "axios";
import {
  setDate,
  setTime,
  resetDateTime,
} from "../redux/features/dateTimeSlice";
import { getDay } from "../common.js/date.js";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import AnimationWrapper from "../component/AnimationWrapper.js";

const SlotBooking = () => {
  const dispatch = useDispatch();

  const { date, time } = useSelector((state) => state.dateTime);
  const { user } = useSelector((state) => state.user);
  const { available } = useSelector((state) => state.slot);

  // hide previous date

  const handelAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "api/v1/user/slot-availability",
        { time: `${date}T${time}:00` },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setAvailable(true));
        // alert(res.data.message);
        toast.success("Slot is available");
      } else {
        dispatch(setAvailable(false));
        // alert(res.data.message);
        toast.error(
          "Slot is not available, Plaese select other date and time."
        );
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handelSlotBooking = async () => {
    try {
      dispatch(showLoading());
      const slotBookingData = {
        userId: user._id,
        userInfo: user,
        time: `${date}T${time}:00`,
      };
      const res = await axios.post(
        "/api/v1/user/slot-booking",
        slotBookingData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        alert(res.data.message);
        dispatch(resetDateTime());
        window.location.reload();
      } else {
        alert(res.data.message);
        dispatch(resetDateTime());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Date", date);
    console.log("Time", time);
  }, [date, time]);

  return (
    <Layout>
      <AnimationWrapper>
        <Toaster position="top-center" />
        <div className="bg-bgMain text-textHeading h-[100vh]">
          <h1 className="text-center pt-12 mb-6 text-btnPrimary">Book Slot</h1>
          <div className="container d-flex flex-column bg-bgCard text-xl py-6 rounded-md">
            {!available && (
              <div className="container flex flex-col">
                <p className="md:text-center font-bold">Select a Date</p>
                <DatePicker
                  className="w-full md:w-[50vw] mx-auto"
                  size="large"
                  format={"DD-MM-YYYY"}
                  onChange={(value) => {
                    if (value) {
                      const formattedDate = value.format("DD-MM-YYYY");
                      dispatch(setDate(formattedDate));
                    } else {
                      dispatch(setDate(null));
                    }
                  }}
                />
                <p className="md:text-center font-bold mt-14">Select a Time</p>
                <TimePicker
                  className="w-full md:w-[50vw] mx-auto mb-6"
                  size="large"
                  format={"HH:mm"}
                  onChange={(value) => {
                    if (value) {
                      const formattedTime = value.format("HH:mm");
                      dispatch(setTime(formattedTime));
                    } else {
                      dispatch(setTime(null));
                    }
                  }}
                />
              </div>
            )}

            {!available && (
              <button
                className=" py-2 px-3 rounded-md text-black bg-btnPrimary m-3 w-full md:w-[50vw] mx-auto"
                onClick={handelAvailability}
              >
                Check Avialability
              </button>
            )}
            {available && (
              <div className="flex flex-col">
                <p className="text-3xl text-center mt-14 mb-5 font-gelasio">
                  Book a slot on{" "}
                  <span className="font-bold">{`${date} at ${time}`}</span>
                </p>
                <button
                  className="btn btn-success m-3"
                  onClick={handelSlotBooking}
                >
                  Book Slot
                </button>
              </div>
            )}
          </div>
        </div>
      </AnimationWrapper>
    </Layout>
  );
};

export default SlotBooking;
