import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';  // For routing
import { AppstoreAddOutlined, DashboardOutlined } from '@ant-design/icons';  // Ant Design icons
import './Sidebar.css';  // Import the sidebar CSS

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider width={200} className="sidebar">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>  {/* Link to Dashboard */}
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
          <Link to="/add-student">Add Student</Link>  {/* Link to Add Student */}
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
