import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AppstoreAddOutlined, DashboardOutlined, CheckCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import './Sidebar.css';
import logo from '../assets/smu emblem.png';

const { Sider } = Layout;

const Sidebar = () => (
  <Sider width={200} className="sidebar">
    <div className="logo-container">
      <img src={logo} alt="Logo" className="sidebar-logo" />
      <div className="menu-header">Main Menu</div>
    </div>
    <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
      {/*<Menu.Item key="1" icon={<DashboardOutlined />}><Link to="/dashboard">Dashboard</Link></Menu.Item>*/}
      <Menu.Item key="1" icon={<AppstoreAddOutlined />}><Link to="/add-student">Add Student</Link></Menu.Item>
      {/*<Menu.Item key="3" icon={<CheckCircleOutlined />}><Link to="/task-tracker">Task Tracker</Link></Menu.Item>*/}
      <Menu.Item key="2" icon={<UserAddOutlined />}><Link to="/user-management">Manage User</Link></Menu.Item>
    </Menu>
  </Sider>
);

export default Sidebar;
