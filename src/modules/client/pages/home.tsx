import SideBar from "../../shared/sideBar";
import { Typography, Col, Row, Button } from "antd";
import { EyeOutlined, EditOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes";
import { useSelector } from "react-redux";
import { UserStateType } from "../../../redux/userStore/reducer";

const { Title } = Typography;

export const ClientHome = () => {
  const navigate = useNavigate();

  const connectedUser: UserStateType = useSelector(
    (state: any) => state.userReducer
  ).user;
  return (
    <SideBar>
      <Title level={1}>Home Client</Title>

      <Row style={{ paddingTop: 20 }}>
        {connectedUser.role.permission.clients.GET && (
          <Col span={7}>
            <Button
              icon={<EyeOutlined />}
              size="large"
              style={{
                width: 300,
                height: 100,
                fontSize: 24,
                color: "blue",
                borderBlockColor: "blue",
              }}
              onClick={() => {
                navigate(ROUTES.CLIENT.VIEW);
              }}
            >
              Voir Clients
            </Button>
          </Col>
        )}
        {connectedUser.role.permission.clients.LOCK && (
          <Col span={7}>
            <Button
              icon={<LockOutlined />}
              size="large"
              style={{
                width: 300,
                height: 100,
                fontSize: 24,
                color: "red",
                borderBlockColor: "red",
              }}
              onClick={() => {
                navigate(ROUTES.CLIENT.LOCK);
              }}
            >
              Bloquer Client
            </Button>
          </Col>
        )}
        {connectedUser.role.permission.clients.PUT && (
          <Col span={7}>
            <Button
              icon={<EditOutlined />}
              size="large"
              style={{
                width: 300,
                height: 100,
                fontSize: 24,
                color: "green",
                borderBlockColor: "green",
              }}
              onClick={() => {
                navigate(ROUTES.CLIENT.EDIT);
              }}
            >
              Editer Clients
            </Button>
          </Col>
        )}
      </Row>
    </SideBar>
  );
};
