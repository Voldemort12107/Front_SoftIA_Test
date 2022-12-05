import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import SideBar from "../../shared/sideBar";
import { get_employer, update_employer } from "../network";
import { UserStateType } from "../../../redux/userStore/reducer";
import { useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import { ROUTES } from "../../../routes";

const EmployerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employer, setEmployer] = useState({
    nom: "",
    prenom: "",
    email: "",
  });
  const connectedUser: UserStateType = useSelector(
    (state: any) => state.userReducer
  ).user;

  useEffect(() => {
    get_employer(id!.toString(), connectedUser.access).then((res) => {
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
        setEmployer({
          nom: res.employer[0].nom,
          prenom: res.employer[0].prenom,
          email: res.employer[0].email,
        });
      }
    });
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEmployer({ ...employer, [name]: value });
  };

  const onFinish = (value: any) => {
    update_employer(
      id!.toString(),
      connectedUser.access,
      employer.nom,
      employer.prenom,
      employer.email
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
        navigate(ROUTES.EMPLOYE.EDIT);
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
            defaultValue={employer?.nom}
            placeholder={employer?.nom}
          ></Input>
        </Form.Item>
        <Form.Item label="prenom" name={"prenom"}>
          <Input
            name={"prenom"}
            type="text"
            onChange={handleChange}
            value={employer?.prenom}
            placeholder={employer?.prenom}
          ></Input>
        </Form.Item>
        <Form.Item label="email" name={"email"}>
          <Input
            name={"email"}
            type="email"
            onChange={handleChange}
            placeholder={employer?.email}
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

export default EmployerForm;
