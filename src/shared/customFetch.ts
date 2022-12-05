import { useNavigate } from "react-router";

export const customFetch = {
  get: (url: string, token: string) => {
    return fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.json());
  },

  post: (url: string, data: any, token: string) => {
    return fetch(url, {
      method: "post",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: data,
    }).then((res) => res.json());
  },

  put: (url: string, data: any, token: string) => {
    return fetch(url, {
      method: "put",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: data,
    }).then((res) => res.json());
  },
};

export const CheckResult = (code: number) => {
  const navigate = useNavigate();

  const CheckR = (code: number) => {
    console.log(code);
    if (code === 404) {
      navigate("*");
    } else {
      if (code === 401) {
        return navigate("/unauthorize");
      }
    }
  };

  return CheckR(code);
};
