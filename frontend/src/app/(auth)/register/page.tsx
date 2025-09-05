import Registerform from "./registerform";

const register = () => {
  return (
    <div className="h-screen mt-[100px]">
      <div className="flex items-center justify-center">
        <div className="bg-white w-[600px]  rounded-2xl">
          <h1 className="text-4xl font-bold p-2 text-center text-grad anination-text">
            Create new User
          </h1>
          <Registerform />
        </div>
      </div>
    </div>
  );
};

export default register;
