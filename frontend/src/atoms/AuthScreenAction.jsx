import { atom } from "recoil";
const AuthScreenAction = atom({
  key: "authScreenAtom",
  default: "login",
});
export default AuthScreenAction;