import React from 'react';
import { Form, Input, Button, Card, Typography, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/login.css';
import logo from '../assets/smu emblem.png';

const { Text } = Typography;
const API_URL = 'http://localhost:5000/api/users';

const Signup = () => {
    const navigate = useNavigate();

    const onFinish = async (v) => {
        try {
            await axios.post(API_URL, {
                userID: Date.now().toString(),
                userFirstName: v.firstName,
                userMiddleName: v.middleName || '',
                userLastName: v.lastName,
                userEmail: v.email,
                userPassword: v.password
            });
            notification.success({ message: 'Signup successful' });
            navigate('/');
        } catch (err) {
            notification.error({ message: 'Signup failed', description: err.response?.data?.message });
        }
    };

    return (
        <div className="login-container">
            <img src={logo} alt="SMU Logo" className="login-image" />
            <Card className="login-card" title="Sign Up">
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="firstName"
                        rules={[{ required: true, message: 'First name is required' }]}
                    >
                        <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item name="middleName">
                        <Input placeholder="Middle Name" />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        rules={[{ required: true, message: 'Last name is required' }]}
                    >
                        <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Password is required' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>Sign Up</Button>
                </Form>
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <Text>Already have an account? <Link to="/">Log In</Link></Text>
                </div>
            </Card>
        </div>
    );
};

export default Signup;
