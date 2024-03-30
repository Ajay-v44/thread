import React from "react";
import { atom } from "recoil";

const UserAtom = atom({
  key: "userAtom",
  default: JSON.parse(localStorage.getItem("user-threads")),
});
export default UserAtom;
