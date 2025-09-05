"use client";
import ButtonSpinner from "@/app/components/Buttonspinner";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Registerform = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const router = useRouter();

  async function hanleChange(e: React.FormEvent) {
    e.preventDefault();
    if (name === "") return toast.error("name is required");
    if (email === "") return toast.error("email is required");
    if (password === "") return toast.error("password is required");
    try {
      setloading(true);
      await axios.post("http://localhost:8000/api/users/register", {
        name,
        email,
        password,
      });
      router.replace("/");
      setloading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={hanleChange}>
      <ToastContainer position="top-center" />
      <div className="p-2 flex flex-col">
        <label className="m-1">Name:</label>
        <input
          className="border border-gray-400 rounded-lg p-2 "
          placeholder="Your email"
          name="name"
          type="name"
          required
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
      </div>

      <div className="p-2 flex flex-col">
        <label className="m-1">Email:</label>
        <input
          className="border border-gray-400 rounded-lg p-2 "
          placeholder="Your email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <div className="p-2 flex flex-col">
        <label className="m-1">Password:</label>
        <input
          className="border border-gray-400 rounded-lg p-2 "
          placeholder="Your password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center mt-2 p-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white font-bold text-2xl cursor-pointer w-full hover:bg-white hover:text-blue-500 p-2 rounded-2xl"
        >
          {loading ? <ButtonSpinner /> : "Register"}
        </button>
      </div>
      <div className="p-2 m-2 text-sm ">
        <Link href={"/login"}>
          Do tou Have Account ??{" "}
          <span className="text-blue-500 ">Go to Login</span>
        </Link>
      </div>
    </form>
  );
};

export default Registerform;
