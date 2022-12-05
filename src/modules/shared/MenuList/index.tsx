import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  HeatMapOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { ROUTES } from "../../../routes";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../redux/userStore/actions";
import { UserStateType } from "../../../redux/userStore/reducer";
const MenuList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const connectedUser: UserStateType = useSelector(
    (state: any) => state.userReducer
  ).user;

  /*const road = [
    {
      label: "Home",
      icon: ,
      link: ROUTES.HOME,
    },
    {
      label: "Client",
      icon: <UserOutlined />,
      link: ROUTES.CLIENT.HOME,
    },
    {
      label: "Employe",
      icon: <HeatMapOutlined />,
      link: ROUTES.EMPLOYE.HOME,
    },
  ];*/

  return (
    <>
      <Menu theme="dark" mode="inline">
        <Menu.Item
          icon={<HomeOutlined />}
          onClick={() => navigate(ROUTES.HOME)}
        >
          {"Home"}
        </Menu.Item>
        {connectedUser.role.permission.clients && (
          <Menu.Item
            icon={<UserOutlined />}
            onClick={() => navigate(ROUTES.CLIENT.HOME)}
          >
            {"Client"}
          </Menu.Item>
        )}
        {connectedUser.role.permission.employer && (
          <Menu.Item
            icon={<HeatMapOutlined />}
            onClick={() => navigate(ROUTES.EMPLOYE.HOME)}
          >
            {"Employe"}
          </Menu.Item>
        )}
        <Menu.Item
          icon={<LogoutOutlined />}
          onClick={() => {
            dispatch(
              createUser({
                isConnected: false,
                access: "",
                nom: "",
                prenom: "",
                email: "",
                role: {
                  nom: "",
                  permission: {},
                },
              })
            );
            navigate(ROUTES.LOGIN);
          }}
        >
          Se Déconnecter
        </Menu.Item>
      </Menu>
    </>
  );
};

export default MenuList;
