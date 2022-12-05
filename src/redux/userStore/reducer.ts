import { UserTypeAction } from "./actions";
import { CREATE_USER } from "./actionTypes";

export type UserStateType = {
  isConnected: boolean;
  access: string;
  nom: string;
  prenom: string;
  email: string;
  role: {
    nom: string;
    permission: any;
  };
};

const INITIAL_STORE: UserStateType = {
  isConnected: false,
  access: "",
  nom: "",
  prenom: "",
  email: "",
  role: {
    nom: "",
    permission: {},
  },
};

export const userReducer = (state = INITIAL_STORE, action: UserTypeAction) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        user: action.data,
      };
    default:
      return state;
  }
};
