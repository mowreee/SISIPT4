import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/login.css';

const { Text } = Typography;

const Signup = () => {
    const navigate = useNavigate();

    const onFinish = () => {
        navigate('/dashboard');
    };

    return (
        <div className="login-container">
            <Card className="login-card" title="Sign Up">
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item name="username" rules={[{ required: true }]}>
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true }]}>
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
