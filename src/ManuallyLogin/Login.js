import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { submitForm } from '../ManuallyLogin/utiles/login-Api'; // Import the utility function

const LoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      await submitForm(values, setErrors, navigate); // Call the submitForm function
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email}
        helperText={formik.touched.email && formik.errors.email}
        fullWidth
        margin="normal"
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && formik.errors.password}
        helperText={formik.touched.password && formik.errors.password}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? <CircularProgress size={24} /> : 'Login'}
      </Button>
      <Button color="secondary" onClick={() => navigate('/signup')}>
        Signup
      </Button>
    </form>
  );
};

export default LoginForm;
