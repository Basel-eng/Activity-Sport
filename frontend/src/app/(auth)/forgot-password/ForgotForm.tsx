"use client";
import ButtonSpinner from "@/app/components/Buttonspinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);

  const router = useRouter();

  async function handlereset(e: React.FormEvent) {
    e.preventDefault();
    if (email === "") return toast.error("email is required");
    try {
      setloading(true);
       await axios.post("http://localhost:8000/api/users/forgot-password", {
        email
      });
      router.replace("/");
      setloading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form >
      <ToastContainer position="top-center" />

      <div className="p-2 flex flex-col">
        <input
          className="border border-gray-400 rounded-lg p-2 "
          placeholder="input Your email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center mt-2 p-2">
        <button
        onClick={handlereset}
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white font-bold text-2xl cursor-pointer w-full hover:bg-white hover:text-blue-500 p-2 rounded-2xl"
        >
          {loading ? <ButtonSpinner /> : "Reset Password"}
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
