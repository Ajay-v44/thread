import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useShowToast";
import axios from "axios";

const useGetuser = () => {
  const [user, setuser] = useState(null);
  const [Loading, setLoading] = useState(true);
  const { username } = useParams();
  const toast = useShowToast();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users/getprofile/${username}`);
        if (res.status === 200) {
          setuser(res.data);
        }
      } catch (err) {
        console.log(err);
        toast("Error",err.message,"error")
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [username]);
return {Loading,user}

};
export default useGetuser;
