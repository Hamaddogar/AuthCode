
import GoogleLogin from "./GoogleLogin/googlelogin";
import Dashboard from "./GoogleLogin/dashboard";
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
function App() {
  return (
    <Router>

      <GoogleLogin />
      <Dashboard />
    </Router>
  );
}

export default App;
