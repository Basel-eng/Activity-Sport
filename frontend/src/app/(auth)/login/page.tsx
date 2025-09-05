import Loginform from "./Loginform";

const Login = () => {
  return (
    <div className="h-screen mt-[100px]">
      <div className="flex items-center justify-center">
        <div className="bg-white w-[600px]  rounded-2xl">
          <h1 className="text-4xl font-bold text-center p-2 anination-text">
            Login User
          </h1>
          <Loginform />
        </div>
      </div>
    </div>
  );
}

export default Login;
