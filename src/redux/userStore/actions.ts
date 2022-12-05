import { CREATE_USER } from "./actionTypes";
import { UserStateType } from "./reducer";

export type UserTypeAction = { type: string; data: any };

export const createUser = (user: UserStateType): UserTypeAction => ({
  type: CREATE_USER,
  data: {
    access: user.access,
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    role: {
      nom: user.role.nom,
      permission: user.role.permission,
    },
  },
});
