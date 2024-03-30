import { Button } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import useShowToast from "../hooks/useShowToast";
import UserAtom from "../atoms/UserAtom";

const LogoutButton = () => {
  const toast = useShowToast();
  const setuser = useSetRecoilState(UserAtom);
  const handleLogout = async () => {
    try {
      const reply = await axios.post("/api/users/logout");
      console.log(reply);
      if (reply.status === 200) {
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
     <IoLogOutOutline size={20}/>
    </Button>
  );
};

export default LogoutButton;
