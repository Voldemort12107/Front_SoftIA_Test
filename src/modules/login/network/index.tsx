import { API_ROUTE } from "../../../API";

export const Signin = async (values: any) => {
  var datas = values;
  var uploadData = [];
  for (var p in datas) {
    var encodedkey = encodeURIComponent(p);
    var encodedvalue = encodeURIComponent(datas[p]);
    uploadData.push(encodedkey + "=" + encodedvalue);
  }
  let a = uploadData.join("&");

  return fetch(API_ROUTE.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: a,
  }).then((res) => {
    return res.json();
  });
};
