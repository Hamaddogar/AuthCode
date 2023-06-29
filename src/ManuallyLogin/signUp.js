import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { OutlinedInput, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem, InputAdornment, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { saveFormDataRequest, saveFormDataSuccess, saveFormDataFailure } from '../RTK/Reducer/formsilce';
import { saveFormData } from '../ManuallyLogin/utiles/fetch-Api';
import { useNavigate } from 'react-router-dom';
const MyForm = () => {
  const dispatch = useDispatch();
       
  const navigate = useNavigate();
  const { successMessage, errorMessage, formData2, loading } = useSelector((state) => state.form);
  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      password: '',
      country: '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid Email Address').required('Email Address is required'),
      contactNumber: Yup.string().required('Contact Number is required'),
      password: Yup.string().required('Password is required'),
      country: Yup.string().required('Country is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch(saveFormDataRequest());

      try {
        const response = await saveFormData(values);
        navigate('/login');
        dispatch(saveFormDataSuccess(response));
        resetForm();
      } catch (error) {
        dispatch(saveFormDataFailure(error.message));
      }
    },
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ width: 600, margin: '0 auto' }}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth variant="outlined" style={{ marginBottom: 16 }}>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <OutlinedInput
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && formik.errors.firstName}
            label="First Name"
          />
        </FormControl>
        <FormControl fullWidth variant="outlined" style={{ marginBottom: 16 }}>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <OutlinedInput
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && formik.errors.lastName}
            label="Last Name"
          />
        </FormControl>
        <FormControl fullWidth variant="outlined" style={{ marginBottom: 16 }}>
          <InputLabel htmlFor="emailAddress">Email Address</InputLabel>
          <OutlinedInput
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            label="Email Address"
          />
        </FormControl>
        <FormControl fullWidth variant="outlined" style={{ marginBottom: 16 }}>
          <InputLabel htmlFor="contactNumber">Contact Number</InputLabel>
          <OutlinedInput
            id="contactNumber"
            name="contactNumber"
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.contactNumber && formik.errors.contactNumber}
            label="Contact Number"
          />
        </FormControl>
        <FormControl fullWidth variant="outlined" style={{ marginBottom: 16 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            label="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth variant="outlined" style={{ marginBottom: 16 }}>
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            id="country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.country && formik.errors.country}
            label="Country"
          >
            <MenuItem value="">Select Country</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="UK">UK</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="Australia">Australia</MenuItem>
            {/* Add more countries as needed */}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />} fullWidth>
          Save
        </Button>
      </form>

      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {successMessage && (
            <h2>
              Success: {formData2.firstName}, {formData2.lastName}, {formData2.emailAddress}, {formData2.contactNumber},{' '}
              {formData2.country}
            </h2>
          )}
          {errorMessage && <h2>Error: {errorMessage}</h2>}
        </div>
      )}
    </div>
  );
};

export default MyForm;
