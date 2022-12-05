import { Typography, Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../shared/sideBar";
import { UserStateType } from "../../../redux/userStore/reducer";
import { useSelector } from "react-redux";
import { get_all_employer } from "../network";

const { Title } = Typography;

const EmployeEdit = () => {
  const [data, setData] = useState<any>();
  const navigate = useNavigate();
  const connectedUser: UserStateType = useSelector(
    (state: any) => state.userReducer
  ).user;

  useEffect(() => {
    get_all_employer(connectedUser.access).then((res) => {
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
        setData(res.employer);
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
      title: "Bloquer",
      dataIndex: "id",
      key: "id",
      render: (id: number) => {
        return (
          <Button type="primary" href={`/employe/edit/from/${id}`}>
            Editer
          </Button>
        );
      },
    },
  ];

  return (
    <SideBar>
      <Title level={1}>Editer Employé</Title>
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

export default EmployeEdit;
