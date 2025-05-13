import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Modal, Table, Popconfirm, Spin } from 'antd';
import axios from 'axios';
import './AddStudent.css';

const API_URL = 'http://localhost:5000/api/users';

const UserManagement = () => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [passwordForm] = Form.useForm();

    const fields = [
        { name: 'userID', label: 'User ID', required: true },
        { name: 'userFirstName', label: 'First Name', required: true },
        { name: 'userMiddleName', label: 'Middle Name', required: true },
        { name: 'userLastName', label: 'Last Name', required: true },
        { name: 'userEmail', label: 'Email', required: true }
    ];

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to fetch users. Please try again later.'
            });
        } finally {
            setLoading(false);
        }
    };

    const showModal = (user = null) => {
        setVisible(true);
        setEditingUser(user);
        if (user) {
            form.setFieldsValue(user);
        } else {
            form.resetFields();
        }
    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        setEditingUser(null);
    };

    const showPasswordModal = (user) => {
        setEditingUser(user);
        setPasswordModal(true);
        passwordForm.resetFields();
    };

    const handlePasswordCancel = () => {
        setPasswordModal(false);
        passwordForm.resetFields();
    };

    const onFinish = async (values) => {
        setLoading(true);

        try {
            if (editingUser) {
                await axios.put(`${API_URL}/${editingUser.userID}`, values);
                notification.success({
                    message: 'User Updated',
                    description: `User ${values.userFirstName} ${values.userLastName} has been updated.`,
                });
            } else {
                if (!values.userPassword) {
                    notification.error({
                        message: 'Error',
                        description: 'Password is required for new users.'
                    });
                    setLoading(false);
                    return;
                }
                await axios.post(API_URL, values);
                notification.success({
                    message: 'User Added',
                    description: `User ${values.userFirstName} ${values.userLastName} has been added.`,
                });
            }

            fetchUsers();
            form.resetFields();
            setVisible(false);
            setEditingUser(null);
        } catch (error) {
            console.error('Error saving user:', error);
            notification.error({
                message: 'Error',
                description: error.response?.data?.message || 'Failed to save user. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    const onPasswordChange = async (values) => {
        setLoading(true);
        try {
            await axios.put(`${API_URL}/${editingUser.userID}/password`, values);
            notification.success({
                message: 'Password Updated',
                description: 'Password has been updated successfully.'
            });
            setPasswordModal(false);
            passwordForm.resetFields();
        } catch (error) {
            console.error('Error updating password:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to update password. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (user) => {
        setLoading(true);
        try {
            await axios.delete(`${API_URL}/${user.userID}`);
            notification.info({
                message: 'User Deleted',
                description: `User ${user.userFirstName} ${user.userLastName} has been deleted.`
            });
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to delete user. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        ...fields.map(({ name, label }) => ({
            title: label,
            dataIndex: name,
            key: name,
        })),
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button size="small" onClick={() => showModal(record)} style={{ marginRight: 8 }}>
                        Edit
                    </Button>
                    <Button size="small" onClick={() => showPasswordModal(record)} style={{ marginRight: 8 }}>
                        Change Password
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this user?"
                        onConfirm={() => handleDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button size="small" danger>Delete</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div className="add-student-container">
            <h1>User Management</h1>
           {/*} <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
                Add User
            </Button>*/}

            <Modal
                title={editingUser ? 'Edit User' : 'Add User'}
                open={visible}
                onCancel={handleCancel}
                footer={null}
                className="add-student-modal"
            >
                <Spin spinning={loading}>
                    <Form form={form} onFinish={onFinish} layout="vertical">
                        {fields.map(({ name, label, required }) => (
                            <Form.Item
                                key={name}
                                name={name}
                                label={label}
                                rules={required ? [{ required: true, message: `Please enter ${label.toLowerCase()}!` }] : []}
                            >
                                <Input disabled={name === 'userID' && editingUser} />
                            </Form.Item>
                        ))}

                        {!editingUser && (
                            <Form.Item
                                name="userPassword"
                                label="Password"
                                rules={[{ required: true, message: 'Please enter password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        )}

                        <Button type="primary" htmlType="submit" className="add-student-btn" loading={loading}>
                            {editingUser ? 'Update User' : 'Add User'}
                        </Button>
                    </Form>
                </Spin>
            </Modal>

            <Modal
                title="Change Password"
                open={passwordModal}
                onCancel={handlePasswordCancel}
                footer={null}
            >
                <Spin spinning={loading}>
                    <Form form={passwordForm} onFinish={onPasswordChange} layout="vertical">
                        <Form.Item
                            name="userPassword"
                            label="New Password"
                            rules={[{ required: true, message: 'Please enter new password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label="Confirm Password"
                            dependencies={['userPassword']}
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('userPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Update Password
                        </Button>
                    </Form>
                </Spin>
            </Modal>

            <Spin spinning={loading}>
                <Table
                    dataSource={users}
                    columns={columns}
                    rowKey="userID"
                    className="add-student-table"
                />
            </Spin>
        </div>
    );
};

export default UserManagement;
