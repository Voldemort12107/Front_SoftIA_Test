import { Result, Button } from "antd";
import { useNavigate } from "react-router";

const Page401 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Result
        status="error"
        title="UNAUTHORIZED"
        subTitle="Vous n'aves pas la permission pour accéder à cette page."
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => navigate("/home")}
          >
            Go Home
          </Button>,
        ]}
      ></Result>
    </>
  );
};

export default Page401;
