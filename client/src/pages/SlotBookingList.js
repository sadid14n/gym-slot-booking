import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import { Table } from "antd";
import moment from "moment";
import { getFullDay } from "../common.js/date";
import AnimationWrapper from "../component/AnimationWrapper";

const SlotBookingList = () => {
  const [slots, setSlots] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);

  const getSlots = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getting-slot-list-for-user",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setSlots(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSlots();
  }, []);

  const column = [
    {
      title: "Sl.No",
      render: (text, record, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (text, record) => (
        <span>
          <b>{getFullDay(record.time)}</b>
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return record.status === "approved" ? (
          <span className="btn btn-success" style={{ pointerEvents: "none" }}>
            {record.status}
          </span>
        ) : record.status === "reject" ? (
          <span className="btn btn-danger" style={{ pointerEvents: "none" }}>
            {record.status}
          </span>
        ) : (
          <span className="btn btn-warning" style={{ pointerEvents: "none" }}>
            {record.status}
          </span>
        );
      },
    },
    {
      title: "Apply Date",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {" "}
          <b>{getFullDay(record.createdAt)}</b>{" "}
        </span>
      ),
    },
  ];
  return (
    <Layout>
      <AnimationWrapper>
        <div className="bg-bgMain text-btnPrimary">
          <h1 className="text-center mb-6 pt-12">Slot Booking List</h1>
          <Table
            scroll={{ x: "max-content" }}
            columns={column}
            dataSource={slots}
          />
        </div>
      </AnimationWrapper>
    </Layout>
  );
};

export default SlotBookingList;
