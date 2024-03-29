import { Button } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/UserAtom";
import axios from "axios";
import useShowToast from "../hooks/useShowToast";

const LogoutButton = () => {
  const toast = useShowToast();
  const setuser = useSetRecoilState(userAtom);
  const handleLogout = async () => {
    try {
      const reply = await axios.post("/api/users/logout");
      console.log(reply);
      if (res.status === 200) {
        toast("Notification", reply.data.message, "warning");
        localStorage.removeItem("user-threads");
        setuser(null);
      }
    } catch (err) {
      toast("ERROR", "Something went wrong", "error");
      console.log(err);
    }
  };
  return (
    <Button
      position={"fixed"}
      top={"30x"}
      right={"30px"}
      size={"sm"}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
