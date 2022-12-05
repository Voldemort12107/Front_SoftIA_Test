import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router";
import Layout from "antd/es/layout";
import { Typography } from "antd";
import { BACKGROUND } from "../../shared/color";
import { ROUTES } from "../../routes";
import { Signin } from "./network";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/userStore/actions";
import jwt_decode from "jwt-decode";

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    Signin(values).then((res) => {
      if (res) {
        let resp: any = jwt_decode(res.access);
        dispatch(
          createUser({
            isConnected: true,
            access: res.access,
            nom: resp.user.nom,
            prenom: resp.user.prenom,
            email: resp.user.email,
            role: {
              nom: resp.user.role.nom,
              permission: resp.user.role.permission,
            },
          })
        );
        navigate(ROUTES.HOME);
      }
    });
  };

  return (
    <Layout
      style={{
        padding: "9.5%",
        backgroundColor: BACKGROUND,
        backgroundSize: "100%",
      }}
    >
      <div style={{ width: 400, alignSelf: "center" }}>
        <Title level={2} style={{ paddingLeft: "5%", alignSelf: "center" }}>
          Test de recrutement Soft IA
        </Title>
        <i style={{ paddingLeft: "50%" }}>By</i>
        <Title level={3} style={{ paddingLeft: "25%" }}>
          ZOUA DAOU Fabrice
        </Title>
      </div>
      <div
        style={{
          width: 400,
          alignSelf: "center",
          backgroundColor: "white",
          padding: 50,
          boxShadow: "1px 2px 5px black",
        }}
      >
        <h1 style={{ width: "100%", alignSelf: "center", textAlign: "center" }}>
          Login{" "}
        </h1>
        <Form
          wrapperCol={{ span: 300 }}
          onFinish={onFinish}
          className="login-form"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Entrez votre email" }]}
          >
            <Input
              placeholder="Email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="email"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Entrez votre mot de passe" }]}
          >
            <Input.Password
              placeholder="Password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", alignSelf: "center" }}
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default LoginPage;
