import React from 'react';
import ReactDOM from 'react-dom/client';
import { Redirect } from 'react-router-dom';
import './index.css';
import LoginApp from './LoginApp';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { Routes,Route } from 'react-router-dom';


const isDashboardPath = (pathname) => {
  return pathname.startsWith('/dashboard/');
};

const ProtectedDashboardContent = () => {
  return (
    <div>
      <h1>This is the protected dashboard content (accessible only after login)</h1>
    </div>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<LoginApp />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
