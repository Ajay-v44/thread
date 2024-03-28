import React from "react";
import Userhaeder from "../components/Userhaeder";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (
    <>
      <Userhaeder />
      <UserPost
        likes={123}
        replies={20}
        postImg="/post1.png"
        postTitle="Lets talk about stock market"
      />
      <UserPost
        likes={223}
        replies={10}
        postImg="/post2.jpeg"
        postTitle="Lets talk about stock market"
      />
      <UserPost
        likes={323}
        replies={50}
        postImg="/post3.png"
        postTitle="Lets talk about stock market"
      />
    </>
  );
};

export default UserPage;
