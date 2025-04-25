import React from 'react';
import { Layout, Space } from 'antd';  // Ant Design components
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // React Router for routing
import Dashboard from './pages/Dashboard';  // Import the Dashboard component
import AddStudent from './pages/AddStudent';  // Import the AddStudent component
import Sidebar from './pages/Sidebar';  // Import the Sidebar component
import './App.css';  // Import the CSS file for styling

const { Header, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout className="app-layout">
        <Sidebar />  {/* Sidebar component */}
        <Layout style={{ marginLeft: 200 }}>
          <Content className="app-content">
            <Space direction="vertical" style={{ width: '100%' }}>
              {/* Routes to render Dashboard or AddStudent based on selected menu item */}
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-student" element={<AddStudent />} />
              </Routes>
            </Space>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
