import React from "react";
import Layout from "../component/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import AnimationWrapper from "../component/AnimationWrapper";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/update-profile", values);
      dispatch(hideLoading());
      if (res.data.success) {
        alert(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <AnimationWrapper>
        <div className="bg-bgMain h-[100vh]">
          <h1 className="text-center text-btnPrimary pt-12 mb-6">Profile</h1>
          <div className="container bg-gray-200 py-4 px-6 rounded-md ">
            <Form
              layout="vertical"
              className="register-form "
              initialValues={{
                name: user?.name,
                email: user?.email,
                password: "", // Leave password empty initially
              }}
              onFinish={onFinishHandler}
            >
              <Form.Item label="Name" name="name">
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input type="email" disabled />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </AnimationWrapper>
    </Layout>
  );
};

export default Profile;
