import React from 'react';
import { Layout, Space, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import TaskTracker from './pages/TaskTracker';
import Sidebar from './pages/Sidebar';
import UserManagement from './pages/UserManagement';
import './App.css';

const { Content } = Layout;

// Separate component for the breadcrumb
const AppBreadcrumb = () => {
  const location = useLocation();
  const breadcrumbNameMap = {
    '/dashboard': 'Dashboard',
    '/add-student': 'Add Student',
    '/task-tracker': 'Task Tracker',
    '/user-management': 'Add User',
  };

  const pathSnippets = location.pathname.split('/').filter(i => i);
  const breadcrumbItems = [
    <Breadcrumb.Item key="home" href="/">
      <HomeOutlined />
    </Breadcrumb.Item>,
    ...pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          {breadcrumbNameMap[url]}
        </Breadcrumb.Item>
      );
    }),
  ];

  return <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>;
};

const AppLayout = () => (
  <Layout className="app-layout">
    <Sidebar />
    <Content className="app-content" style={{ padding: '0 24px' }}>
      <AppBreadcrumb />
      <Space direction="vertical" style={{ width: '100%' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/task-tracker" element={<TaskTracker />} />
          <Route path="/user-management" element={<UserManagement />} />
        </Routes>
      </Space>
    </Content>
  </Layout>
);

const App = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
