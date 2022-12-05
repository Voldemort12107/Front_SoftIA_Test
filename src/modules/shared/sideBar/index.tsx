import { Layout, Typography, Divider, Col } from "antd";
import React, { ReactNode } from "react";
import { UserStateType } from "../../../redux/userStore/reducer";
import MenuList from "../MenuList";
import { useSelector } from "react-redux";

const { Sider, Content } = Layout;
const { Title } = Typography;
const SideBar = ({ children }: { children: ReactNode }) => {
  const connectedUser: UserStateType = useSelector(
    (state: any) => state.userReducer
  ).user;

  return (
    <Layout>
      <Col flex={"250px"}>
        <Sider
          width={250}
          style={{ height: "100%", paddingTop: 10, position: "fixed" }}
        >
          <div
            style={{ color: "white", paddingBottom: 10, alignItems: "center" }}
          >
            <Title level={2} style={{ color: "white" }}>
              Soft IA Test
            </Title>

            <Title level={4} style={{ color: "white" }}>
              ZOUA DAOU Fabrice
            </Title>
          </div>
          <Divider style={{ backgroundColor: "white" }}></Divider>
          <Title level={4} style={{ color: "white" }}>
            Bienvenue: {connectedUser.nom}
          </Title>
          <MenuList />
        </Sider>
      </Col>
      <Col flex={"auto"}>
        <Content style={{ marginLeft: 50, padding: 10, minHeight: 790 }}>
          {children}
        </Content>
      </Col>
    </Layout>
  );
};

export default SideBar;
