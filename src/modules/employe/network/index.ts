import { API_ROUTE } from "../../../API";
import { customFetch } from "../../../shared/customFetch";

export const get_all_employer = (token: string): Promise<any> => {
  return customFetch.get(API_ROUTE.EMPLOYER.GET_ALL, token);
};

export const get_employer = (id: string, token: string): Promise<any> => {
  return customFetch.get(API_ROUTE.EMPLOYER.GET_ALL + id + "/", token);
};

export const update_employer = (
  id: string,
  token: string,
  nom: string,
  prenom: string,
  email: string
): Promise<any> => {
  let formdata = new FormData();
  console.log(token, nom);
  formdata.append("nom", nom);
  formdata.append("prenom", prenom);
  formdata.append("email", email);
  return customFetch.post(
    API_ROUTE.EMPLOYER.GET_ALL + "update/" + id + "/",
    formdata,
    token
  );
};

export const lock_employer = (id: string, token: string): Promise<any> => {
  let formdata = new FormData();
  return customFetch.post(
    API_ROUTE.EMPLOYER.GET_ALL + id + "/lock/",
    formdata,
    token
  );
};
