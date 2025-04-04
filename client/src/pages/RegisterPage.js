import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../component/Layout";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error);
    }
  };

  return (
    <Layout>
      <div className="bg-bgMain w-full h-screen">
        <div className="md:w-[50vw] w-[90vw] mx-auto bg-btnPrimary min-h-screen md:px-10 px-6 pt-14">
          <Form
            layout="vertical"
            className="register-form"
            onFinish={onFinishHandler}
          >
            <h2 className="register-form text-center">Register</h2>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please Enter Your Name" }]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please Enter Your Email" }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please Enter Your Password" },
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Link
              to="/login"
              className=" px-3 py-2 bg-btnSecondary rounded-md no-underline text-white"
            >
              Already User? Please Login
            </Link>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="mt-3">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
