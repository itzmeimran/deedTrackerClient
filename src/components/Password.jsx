import {
  TextField,
  InputAdornment,
  IconButton,
  LinearProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Function to calculate password strength
const calculateStrength = (password) => {
  let strength = 0;
  const lengthCriteria = password.length >= 8 ? 1 : 0; // 1 point for length >= 8
  const uppercaseCriteria = /[A-Z]/.test(password) ? 1 : 0; // 1 point for uppercase letter
  const lowercaseCriteria = /[a-z]/.test(password) ? 1 : 0; // 1 point for lowercase letter
  const numberCriteria = /[0-9]/.test(password) ? 1 : 0; // 1 point for number
  const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password) ? 1 : 0; // 1 point for special character

  // Total strength based on matching criteria
  strength =
    lengthCriteria +
    uppercaseCriteria +
    lowercaseCriteria +
    numberCriteria +
    specialCharCriteria;

  return strength;
};

const Password = ({
  register,
  errors,
  name,
  label,
  passwordValue,
  login = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [strength, setStrength] = useState(0);
  const [focused, setFocused] = useState(false); // Track if password field is focused

  const handleClickShowPassword = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setStrength(calculateStrength(password));
  };

  const handleFocus = () => {
    setFocused(true); // Set focused to true when the field is focused
  };

  const handleBlur = () => {
    setFocused(false); // Set focused to false when the field loses focus
  };

  // Define the validate logic only for confirmPassword field
  const validateConfirmPassword =
    name === "confirmPassword"
      ? (value) => value === passwordValue || "Passwords do not match"
      : undefined;

  // Determine color based on strength
  const getStrengthColor = () => {
    if (strength <= 1) return "error"; // Weak password (Red)
    if (strength === 2 || strength === 3) return "warning"; // Mild password (Orange)
    return "success"; // Strong password (Green)
  };

  return (
    <div>
      <TextField
        variant="filled"
        label={label}
        type={visible ? "text" : "password"} // Toggle between text and password
        {...register(name, {
          required: `${label} is required`,
          validate: validateConfirmPassword,
          minLength: {
            value: 4,
            message: "Password must be at least 4 characters",
          },
        })}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        fullWidth
        required
        onChange={handlePasswordChange}
        onFocus={handleFocus} // Trigger focus state change when field is focused
        onBlur={handleBlur} // Trigger blur state change when field loses focus
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {focused && (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {visible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />

      {/* Password Strength Meter - Only visible when focused */}
      {focused && !login && (
        <div>
          <LinearProgress
            variant="determinate"
            value={(strength / 5) * 100} // Normalize the value between 0 and 100
            color={getStrengthColor()} // Set color based on strength
            sx={{ marginTop: 2 }}
          />
          <div
            style={{ marginTop: "8px", fontSize: "0.875rem", color: "gray" }}
          >
            {strength === 0
              ? "Password is too weak"
              : strength <= 2
              ? "Password is mild"
              : "Password is strong"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Password;
