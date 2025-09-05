"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const logouthandler = async () => {
    try {
      await axios.get("http://localhost:8000/api/users/logout" ,{withCredentials:true});
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={logouthandler}
      type="submit"
      className="bg-blue-400 text-white rounded p-1 m-1"
    >
      Logout
    </button>
  );
};

export default Logout;
