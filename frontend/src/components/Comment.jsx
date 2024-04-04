import react, { useState } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import CircularProgressCircle from "./CircularProgressCircle";
import axios from "axios";
import { useRecoilState } from "recoil";
import UserAtom from "../atoms/UserAtom";
import useShowToast from "../hooks/useShowToast";

const Comment = ({ reply, pid }) => {
  const currentuser = useRecoilState(UserAtom);
  const toast = useShowToast();
  const [Loading, setLoading] = useState(false);
  const [value, setvalue] = useState(10);
  console.log(reply.userId, pid, currentuser[0]._id);
  const handleOnClick = async () => {
    setLoading(true);
    try {
      setvalue(50);
      const res = await axios.delete("/api/post/deletereply", {
        data: {
          pid: pid,
          uid: currentuser[0]._id,
          _id: reply._id,
        },
      });
      if (res.status === 200) {
        toast("Deleted", res.data.message, "success");
      }
    } catch (err) {
      console.log(err);
      toast("Error", err.response.data.message, "error");
    } finally {
      setvalue(100);
      setLoading(false);
    }
  };

  return (
    <div>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={reply.userProfilePic} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize="sm" fontWeight="bold">
              {reply.username}
            </Text>
          </Flex>
          <Text>{reply.text}</Text>
        </Flex>
        {reply.userId === currentuser[0]._id &&
          (Loading ? (
            <CircularProgressCircle value={value} />
          ) : (
            <DeleteIcon
              color={"red"}
              onClick={handleOnClick}
              cursor={"pointer"}
            />
          ))}
      </Flex>
    </div>
  );
};

export default Comment;
