import Register from './components/Register';
import Login from "./Login"
import App from "./App"
import Layout from "./components/Layout"
import Missing from './components/Missing';
import Unauthorized from "./components/Unauthorized"
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import axios from './api/axios';
import { AuthProvider } from './context/AuthProvider';



// Rolse for validating the user state need to be extracted from the database at the authentication process
// const ROLES = {
//   'NormalUser': 2001,
//   'Employee': 1984,
//   'Manager': 5150
// }
const GET_URL='http://localhost:8888/dashboard';
const ROLES= await axios.get(GET_URL);

function LoginApp() {

  return (
    <Routes>
      {/* Nest another components here by using Outlet component*/}
      <Route path="/" element={<Layout />}>
        {/* public routes */} 
        <Route path="" element={<Login />} />      {/* aici trebuie returnat tipul userului astfel incat sa ruteze corect in API */}

        <Route path="login" element={<Login />} />      {/* aici trebuie returnat tipul userului astfel incat sa ruteze corect in API */}
        {/* <Route path="register" element={<Register />} /> */}
        {/* <Route path="linkpage" element={<LinkPage />} /> */}
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}                        {/* Aici va lucra cu gradul de acces primit la logare */}
        <Route element={<RequireAuth allowedRoles={ROLES} />}> 
          <Route path="/*" element={<App element={ROLES} />} />
        </Route>
        

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default LoginApp;