import ResetPassword from "./ResetPassword";

const Reset = () => {
  return (
    <div className="h-screen mt-[100px]">
      <div className="flex items-center justify-center">
        <div className="bg-white w-[600px]  rounded-2xl">
          <h1 className="text-4xl font-bold text-center p-2 anination-text">
            Forgot Password
          </h1>
          <ResetPassword />
        </div>
      </div>
    </div>
  );
};

export default Reset;
