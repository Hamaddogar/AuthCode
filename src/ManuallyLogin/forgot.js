import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch('http://localhost:8080/forgot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Handle success
          console.log('Email sent successfully');
        } else {
          // Handle error
          const errorData = await response.json();
          setErrors({ email: errorData.message });
        }
      } catch (error) {
        setErrors({ email: 'Server error' });
      } finally {
        setSubmitting(false);
      }
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
      <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? <CircularProgress size={24} /> : 'Send Email'}
      </Button>
      <Button color="secondary" onClick={() => navigate('/login')}>
  login
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
