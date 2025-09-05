"use client";
import ButtonSpinner from "@/app/components/Buttonspinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ResetPassword = () => {
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setloading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    try {
      setloading(true);
      axios
        .get(
          `http://localhost:8000/api/users/reset-password/${userId}/${resetPasswordToken}`
        )
        .then()
        .catch();

      router.replace("/");
      setloading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }, [userId, resetPasswordToken]);

  async function handlereset(e: React.FormEvent) {
    e.preventDefault();
    try {
      setloading(true);
      const { data } = await axios.post(
        `http://localhost:8000/api/users/reset-password`,
        {
          userId: parseInt(userId),
          newPassword: password,
          resetPasswordToken,
        }
      );

      router.replace("/");
      setloading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handlereset}>
      <ToastContainer position="top-center" />

      <div className="p-2 flex flex-col">
        <input
          className="border border-gray-400 rounded-lg p-2 "
          placeholder="input Your email"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>
      <div className="p-2 flex flex-col">
        <input
          className="border border-gray-400 rounded-lg p-2 "
          placeholder="input Your email"
          name="email"
          type="email"
          required
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center mt-2 p-2">
        <button
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

export default ResetPassword;
