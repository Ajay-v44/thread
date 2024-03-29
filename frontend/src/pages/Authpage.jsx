import React from "react";
import SignupCard from "../components/SignupCard";
import { useRecoilValue } from "recoil";
import AuthScreenAction from "../atoms/AuthScreenAction";
import LoginCard from "../components/LoginCard";
const Authpage = () => {
  const AuthScreenState = useRecoilValue(AuthScreenAction);

  return (
    <div>{AuthScreenState === "login" ? <LoginCard /> : <SignupCard />}</div>
  );
};

export default Authpage;
