import { Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset, // Reset function to clear form
    formState: { errors },
  } = useForm();

  async function handleRegister(data) {
    try {
      const URL = process.env.REACT_APP_CONST_AUTH + "register";
      const response = await axios.post(URL, data);

      if (response.data.success) { // Ensure correct response handling
        toast.success("Registration successful!");
        reset(); // Clear form after success
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  }

  // Watch password field for confirmation validation
  const password = watch("password");

  return (
    <div>
      <form className="flex flex-col gap-2 mt-3" onSubmit={handleSubmit(handleRegister)}>
        {/* First Name */}
        <TextField
          variant="filled"
          label="First Name"
          {...register("firstName", { required: "First Name is required" })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          fullWidth
          required
        />

        {/* Last Name */}
        <TextField
          variant="filled"
          label="Last Name"
          {...register("lastName", { required: "Last Name is required" })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          fullWidth
          required
        />

        {/* Email */}
        <TextField
          variant="filled"
          label="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email format",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          required
        />

        {/* Password */}
        <TextField
          variant="filled"
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
          required
        />

        {/* Confirm Password */}
        <TextField
          variant="filled"
          label="Confirm Password"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          fullWidth
          required
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
