import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import '../pages/login.css';
import logo from '../assets/smu emblem.png';

const { Text } = Typography;

const Login = ({ onLogin }) => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userEmail: values.email,
                userPassword: values.password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    onLogin();
                    navigate("/dashboard");
                } else {
                    alert(data.message);
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="login-container">
            <img src={logo} alt="SMU Logo" className="login-image" />
            <Card className="login-card" title="Login">
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: "Please enter your email!" }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Please enter your password!" }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Log In
                    </Button>
                </Form>
                <div style={{ marginTop: 16, textAlign: "center" }}>
                    <Text>
                        New User? <Link to="/signup">Sign Up here</Link>
                    </Text>
                </div>
            </Card>
        </div>
    );
};

export default Login;
