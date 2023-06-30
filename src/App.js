
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from '../src/ManuallyLogin/Login';
import SignupForm from '../src/ManuallyLogin/signUp';
import Dashboard from '../src/ManuallyLogin/Dashboard';
 import Forgot from '../src/ManuallyLogin/forgot'
 import Reset from '../src/ManuallyLogin/resetpassword'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/reset/:token" element={<Reset/>} />

      </Routes>
    </Router>
  );
};

export default App;


  // For Apple Authetication
  // import React, { useState, useEffect } from 'react';
  // import firebase from '../src/AppleLogin/firebase';
  // import Login from '../src/AppleLogin/appleLogin';
  // import Logout from '../src/AppleLogin/Logout';
  // import Dashboard from '../src/AppleLogin/dashboard';
  
  // const App = () => {
  //   const [user, setUser] = useState(null);
  
  //   useEffect(() => {
  //     const unsubscribe = firebase.auth().onAuthStateChanged(user => {
  //       setUser(user);
  //     });
  
  //     return () => unsubscribe();
  //   }, []);
  
  //   return (
  //     <div>
  //       {user ? (
  //         <>
  //           <Logout />
  //           <Dashboard user={user} />
  //         </>
  //       ) : (
  //         <Login />
  //       )}
  //     </div>
  //   );
  // };
  
  // export default App;
  


// import GoogleLogin from "./GoogleLogin/googlelogin";
// import Dashboard from "./GoogleLogin/dashboard";
// import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
// function App() {
//   return (
//     <Router>

//       <GoogleLogin />
//       <Dashboard />
//     </Router>
//   );
// }

// export default App;
