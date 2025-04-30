import React from 'react';
import { Layout, Space } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import TaskTracker from './pages/TaskTracker';
import Sidebar from './pages/Sidebar';
import './App.css';

const { Header, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout className="app-layout">
        <Sidebar />
        <Content className="app-content">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-student" element={<AddStudent />} />
              <Route path="/task-tracker" element={<TaskTracker />} />
            </Routes>
          </Space>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
