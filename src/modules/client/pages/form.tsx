import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import SideBar from "../../shared/sideBar";
import { get_client, update_client } from "../network";
import { UserStateType } from "../../../redux/userStore/reducer";
import { useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import { ROUTES } from "../../../routes";

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState({
    nom: "",
    prenom: "",
    email: "",
  });
  const connectedUser: UserStateType = useSelector(
    (state: any) => state.userReducer
  ).user;

  useEffect(() => {
    get_client(id!.toString(), connectedUser.access).then((res) => {
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
        console.log(res.client[0]);
        setClient({
          nom: res.client[0].nom,
          prenom: res.client[0].prenom,
          email: res.client[0].email,
        });
      }
    });
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
    console.log(client);
  };

  const onFinish = (value: any) => {
    update_client(
      id!.toString(),
      connectedUser.access,
      client.nom,
      client.prenom,
      client.email
    ).then((res) => {
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
        navigate(ROUTES.CLIENT.EDIT);
      }
    });
  };

  return (
    <SideBar>
      <Form onFinish={onFinish}>
        <Form.Item label="nom" name="nom">
          <Input
            name="nom"
            type="text"
            onChange={handleChange}
            defaultValue={client?.nom}
            placeholder={client?.nom}
          ></Input>
        </Form.Item>
        <Form.Item label="prenom" name={"prenom"}>
          <Input
            name={"prenom"}
            type="text"
            onChange={handleChange}
            value={client?.prenom}
            placeholder={client?.prenom}
          ></Input>
        </Form.Item>
        <Form.Item label="email" name={"email"}>
          <Input
            name={"email"}
            type="email"
            onChange={handleChange}
            placeholder={client?.email}
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </SideBar>
  );
};

export default ClientForm;
