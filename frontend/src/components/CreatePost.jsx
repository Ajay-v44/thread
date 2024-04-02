import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import usePrevieimage from "../hooks/usePrevieimage";
import { BsFillImageFill } from "react-icons/bs";
import useShowToast from "../hooks/useShowToast";
import axios from "axios";
import { useRecoilState } from "recoil";
import PostAtom from "../atoms/PostAtom";
import { useParams } from "react-router-dom";
import UserAtom from "../atoms/UserAtom";
const CreatePost = () => {
  const user = useRecoilState(UserAtom);

  const { username } = useParams();
  const [posts, setposts] = useRecoilState(PostAtom);
  const [Loading, setLoading] = useState(false);
  const toast = useShowToast();
  const Max_Count = 500;
  const { handleImageChange, imgUrl, setImgUrl } = usePrevieimage();
  const fileRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [posttext, setposttext] = useState("");
  const [remainingtext, setremainingtext] = useState(Max_Count);
  const handleTextChange = (e) => {
    const input = e.target.value;
    if (input.length > Max_Count) {
      const truncate = input.slice(0, Max_Count);
      setposttext(truncate);
      setremainingtext(0);
    } else {
      setposttext(input);
      setremainingtext(Max_Count - input.length);
    }
  };
  const handlePostCreation = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/post/create", {
        text: posttext,
        img: imgUrl,
      });
      if (res.status === 201) {
        if (username === user[0].username) {
          setposts([res.data.newPost, ...posts]);
        }
        toast("Sucess", res.data.message, "success");
      }
    } catch (err) {
      console.log(err);
      toast("Error", "Something Went Wrong", "error");
    } finally {
      setLoading(false);
      setremainingtext(Max_Count);
      setposttext("");
      onClose();
      setImgUrl("");
    }
  };
  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={10}
        leftIcon={<AddIcon />}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      >
        Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                _placeholder={"Post Content goes here"}
                onChange={handleTextChange}
                value={posttext}
              ></Textarea>
              <Text
                fontSize={"xx-small"}
                fontWeight={"bold"}
                textAlign={"right"}
                m={1}
              >
                {remainingtext} / {Max_Count}
              </Text>
              <Input
                type="file"
                hidden
                ref={fileRef}
                onChange={handleImageChange}
              />
              <BsFillImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size={16}
                onClick={() => fileRef.current.click()}
              />
              {imgUrl && (
                <Flex mt={5} w={"full"} position={"relative"}>
                  <Image src={imgUrl} alt="Selected img" />
                  <CloseButton
                    onClick={() => {
                      setImgUrl("");
                    }}
                    bg={"gray.800"}
                    position={"absolute"}
                    top={2}
                    right={2}
                  />
                </Flex>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={handlePostCreation}
              isLoading={Loading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
