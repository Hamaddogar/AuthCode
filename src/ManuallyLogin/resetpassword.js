import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
const validationSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const resetData = {
        password: values.password,
        token: token,
      };

      fetch(`http://localhost:8080/resetpassword/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle response from server
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        type={showPassword ? 'text' : 'password'}
        label="New Password"
        variant="outlined"
        {...formik.getFieldProps('password')}
        error={formik.touched.password && formik.errors.password ? true : false}
        helperText={formik.touched.password && formik.errors.password}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        type={showConfirmPassword ? 'text' : 'password'}
        label="Confirm Password"
        variant="outlined"
        {...formik.getFieldProps('confirmPassword')}
        error={
          formik.touched.confirmPassword && formik.errors.confirmPassword
            ? true
            : false
        }
        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={toggleConfirmPasswordVisibility}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button type="submit" variant="contained" color="primary">
        Reset Password
      </Button>
      <Button color="secondary" onClick={() => navigate('/login')}>
  login
      </Button>
    </form>
  );
}

export default ResetPasswordForm;
