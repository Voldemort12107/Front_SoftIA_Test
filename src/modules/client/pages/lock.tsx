import { Typography, Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../shared/sideBar";
import { get_all_client, lock_client } from "../network";
import { UserStateType } from "../../../redux/userStore/reducer";
import { useSelector } from "react-redux";

const { Title } = Typography;

export const ClientLock = () => {
  const [data, setData] = useState<any>();
  const navigate = useNavigate();
  const connectedUser: UserStateType = useSelector(
    (state: any) => state.userReducer
  ).user;

  useEffect(() => {
    get_all_client(connectedUser.access).then((res) => {
      if (res.code) {
        console.log(res.code);
        if (res.code === 404) {
          navigate("*");
        } else {
          if (res.code === 401) {
            return navigate("/unauthorize");
          }
        }
      } else {
        setData(res.client);
      }
    });
  }, []);

  const columns = [
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Prenom",
      dataIndex: "prenom",
      key: "prenom",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Statut",
      key: "is_active",
      dataIndex: "is_active",
      render: (is_active: boolean) => {
        return (
          <>
            {is_active === true ? (
              <Tag color="#87d068">Actif</Tag>
            ) : (
              <Tag color="#f50">Bloqué</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Bloquer",
      dataIndex: "id",
      key: "id",
      render: (id: number) => {
        return (
          <Button
            danger
            onClick={() => {
              lock_client(id.toString(), connectedUser.access).then((res) => {
                if (res.code) {
                  console.log(res.code);
                  if (res.code === 404) {
                    navigate("*");
                  } else {
                    if (res.code === 401) {
                      return navigate("/unauthorize");
                    }
                  }
                } else {
                  navigate(0);
                }
              });
            }}
          >
            Bloquer/Débloquer
          </Button>
        );
      },
    },
  ];

  return (
    <SideBar>
      <Title level={1}>Bloquer Client</Title>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      ></Table>
      <div>
        <Button onClick={() => navigate(-1)}>Retour</Button>
      </div>
    </SideBar>
  );
};

export default ClientLock;
