import { Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form"; // Import react-hook-form
import { useNavigate } from "react-router-dom";
import Password from "../../components/Password";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  async function handleLogin(data) {
    try {
      const URL = process.env.REACT_APP_CONST_AUTH + "login";
      const response = await axios.post(URL, data);
      console.log(response.data);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      if (response.data.token) {
        navigate("/");
      }
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="">
      <form
        className="flex flex-col justify-center gap-2 mt-3"
        onSubmit={handleSubmit(handleLogin)}
      >
        {/* Email Field with Validation */}
        <TextField
          variant="filled"
          name="email"
          type="email"
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email format",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          required
        />

        {/* Password Field with Validation */}
        <Password
          register={register}
          errors={errors}
          name="password"
          label="Password"
          login = {true}
        />

        {/* Submit Button */}
        <Button type="submit" variant="var1">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
