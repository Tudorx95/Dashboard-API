import Register from './components/Register';
import Login from "./Login"
import App from "./App"
import Layout from "./components/Layout"
import Missing from './components/Missing';
import Unauthorized from "./components/Unauthorized"
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function LoginApp() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        {/* <Route path="register" element={<Register />} /> */}
        {/* <Route path="linkpage" element={<LinkPage />} /> */}
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<App />} />
        </Route>


        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default LoginApp;