import { Button, Result } from "antd";
import { useNavigate } from "react-router";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Result
        status={"404"}
        title={"404"}
        subTitle="Désolé, cette page n'existe pas"
        extra={
          <Button type="primary" onClick={() => navigate("/home")}>
            Go Home
          </Button>
        }
      ></Result>
    </>
  );
};

export default Page404;
