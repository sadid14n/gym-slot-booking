import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Layout from "./../../component/Layout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";

const AdminSlotBookingList = () => {
  const [slotList, setSlotList] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const getSlotList = async () => {
    try {
      const res = await axios.get("api/v1/admin/admin-slot-list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setSlotList(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/admin/admin-slot-list-status-update",
        { appointmentId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.status.success) {
        alert(res.data.message);
        getSlotList();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getSlotList();
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
      title: "Name",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo[0].name}</span>,
    },
    {
      title: "Requested Time",
      dataIndex: "time",
      render: (text, record) => (
        <span>
          {" "}
          <b>{moment(record.time).format("DD-MM-YYYY HH:mm")}</b> &nbsp;
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success m-2"
                onClick={() => handleStatus(record, "approved")}
              >
                Approved
              </button>
              <button
                className="btn btn-danger m-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1>Manage Slot Booking</h1>
      <Table
        columns={column}
        dataSource={slotList}
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
      />
    </Layout>
  );
};

export default AdminSlotBookingList;
