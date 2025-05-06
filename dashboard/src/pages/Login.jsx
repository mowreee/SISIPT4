import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import '../pages/login.css';
import logo from '../assets/smulogo.png';

const { Text } = Typography;

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const onFinish = () => {
        onLogin();
        navigate('/dashboard');
    };

    return (
        <div className="login-container">
            <img src={logo} alt="Login Visual" className="login-image" />
            <Card className="login-card" title="Login">
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item name="username" rules={[{ required: true }]}>
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true }]}>
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>Log In</Button>
                </Form>
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <Text>New User? <Link to="/signup">Sign Up here</Link></Text>
                </div>
            </Card>
        </div>
    );
};

export default Login;
