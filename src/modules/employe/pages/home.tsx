import SideBar from "../../shared/sideBar";
import { Typography, Row, Col, Button } from "antd";
import { EyeOutlined, EditOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes";
import { useSelector } from "react-redux";
import { UserStateType } from "../../../redux/userStore/reducer";

const { Title } = Typography;

const EmployeHome = () => {
  const navigate = useNavigate();
  const connectedUser: UserStateType = useSelector(
    (state: any) => state.userReducer
  ).user;

  return (
    <SideBar>
      <Title level={1}>Home Employé</Title>

      <Row style={{ paddingTop: 20 }}>
        {connectedUser.role.permission.employer.GET && (
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
                navigate(ROUTES.EMPLOYE.VIEW);
              }}
            >
              Voir Employés
            </Button>
          </Col>
        )}
        {connectedUser.role.permission.employer.LOCK && (
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
                navigate(ROUTES.EMPLOYE.LOCK);
              }}
            >
              Bloquer Employé
            </Button>
          </Col>
        )}
        {connectedUser.role.permission.employer.PUT && (
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
                navigate(ROUTES.EMPLOYE.EDIT);
              }}
            >
              Editer Employé
            </Button>
          </Col>
        )}
      </Row>
    </SideBar>
  );
};

export default EmployeHome;
