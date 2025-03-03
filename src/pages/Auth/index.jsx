import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="min-h-[100vh] w-[100vw] flex m-auto">
      <div className="sm:w-[calc(100%-2rem)] pt-4 pb-4 md:w-[350px] h-[400px] m-auto">
        <div>
          <h1 className="text-center font-bold pb-4">Deed Tracker</h1>
        </div>
        <div className="flex justify-evenly  ">
          <h1
            onClick={() => setLogin(!login)}
            className={`w-full text-center h-[50px] items-center flex justify-center cursor-pointer hover:bg-black hover:text-white ${
              login && "bg-black text-white"
            }`}
          >
            Login
          </h1>
          <h1
            onClick={() => setLogin(!login)}
            className={`w-full text-center h-[50px] items-center flex justify-center cursor-pointer hover:bg-black hover:text-white ${
              !login && "bg-black text-white"
            }`}
          >
            Register
          </h1>
        </div>
        <div className="min-h-[100vh]">
          {login && <Login />}
          {!login && <Register />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
