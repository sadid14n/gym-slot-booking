import React, { use } from "react";
import Layout from "../component/Layout";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import AnimationWrapper from "../component/AnimationWrapper";

const Notification = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handel Mark All Read
  const handelMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/mark-all-read-notifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.succes) {
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Handel Delete All Notifications
  const handelDeleteAllNotifications = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.succes) {
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <AnimationWrapper>
        <div className="h-screen ">
          <div className="h-full overflow-y-auto bg-bgMain px-2">
            <h3 className="text-center text-btnPrimary pt-12 mb-6">
              All Notifications
            </h3>

            <Tabs>
              <Tabs.TabPane tab="Unread" key={0}>
                <div className="d-flex">
                  <h5
                    className="p-3 text-btnPrimary"
                    style={{ cursor: "pointer" }}
                    onClick={handelMarkAllRead}
                  >
                    Mark All Read
                  </h5>
                </div>
                {user?.isAdmin
                  ? user?.notifications?.map((notification, i) => {
                      return (
                        <div
                          className="card m-3 p-2"
                          style={{ cursor: "pointer", fontSize: "16px" }}
                          onClick={() => navigate("/admin-slot-list")}
                        >
                          <div className="card-text">
                            {notification.message}
                          </div>
                        </div>
                      );
                    })
                  : user?.notifications?.map((notification) => {
                      return (
                        <div
                          className="card m-3 "
                          style={{ cursor: "pointer", fontSize: "16px" }}
                          onClick={() => navigate("/slot-list")}
                        >
                          <div className="card-text bg-bgMain text-textHeading p-2">
                            {notification.message}
                          </div>
                        </div>
                      );
                    })}
              </Tabs.TabPane>

              <Tabs.TabPane tab="Read" key={1}>
                <div className="d-flex">
                  <h5
                    className="p-3 text-btnPrimary"
                    style={{ cursor: "pointer" }}
                    onClick={handelDeleteAllNotifications}
                  >
                    Delete All Notifications
                  </h5>
                </div>
                {user?.isAdmin
                  ? user?.seenNotifications?.map((seenNotification) => {
                      return (
                        <div
                          className="card m-3 p-2"
                          style={{ cursor: "pointer", fontSize: "16px" }}
                          onClick={() => navigate("/admin-slot-list")}
                        >
                          <div className="card-tetx">
                            {seenNotification.message}
                          </div>
                        </div>
                      );
                    })
                  : user?.seenNotifications?.map((seenNotification) => {
                      return (
                        <div
                          className="card m-3 "
                          style={{ cursor: "pointer", fontSize: "16px" }}
                          onClick={() => navigate("/slot-list")}
                        >
                          <div className="card-text bg-bgCard text-textHeading p-2">
                            {seenNotification.message}
                          </div>
                        </div>
                      );
                    })}
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </AnimationWrapper>
    </Layout>
  );
};

export default Notification;
