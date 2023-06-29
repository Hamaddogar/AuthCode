import axios from 'axios';

export const submitForm = async (values, setErrors, navigate) => {
  try {
    const response = await axios.post('http://localhost:8080/api/login', values);
    console.log(response.data); // You can handle the response here and redirect to the dashboard
    navigate('/dashboard'); // Redirect to the dashboard page
  } catch (error) {
    const { response } = error;
    if (response && response.status === 401) {
      setErrors({ password: 'Invalid email or password' });
    } else {
      setErrors({ password: 'Server error' });
    }
  }
};
