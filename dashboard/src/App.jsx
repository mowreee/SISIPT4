import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import TaskTracker from './pages/TaskTracker';
import UserManagement from './pages/UserManagement';
import Sidebar from './pages/Sidebar';
import './App.css';

const App = () => {
  const [isAuth, setAuth] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setAuth(true)} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            isAuth ? (
              <div className="app-layout">
                <Sidebar />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/add-student" element={<AddStudent />} />
                  <Route path="/task-tracker" element={<TaskTracker />} />
                  <Route path="/user-management" element={<UserManagement />} />
                  {/*<Route path="*" element={<Navigate to="/dashboard" />} />*/}
                </Routes>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;