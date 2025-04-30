import React, { useState } from 'react';
import { Form, Input, Button, notification, Modal, Table } from 'antd';
import './AddStudent.css';

const UserManagement = () => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [users, setUsers] = useState([]);

    const onFinish = (values) => {
        setUsers([...users, values]);
        form.resetFields();
        setVisible(false);
        notification.success({
            message: 'User Added',
            description: `User ${values.firstName} ${values.lastName} has been added.`,
        });
    };

    const showModal = () => setVisible(true);
    const handleCancel = () => setVisible(false);

    const fields = [
        { name: 'userId', label: 'User ID', required: true },
        { name: 'firstName', label: 'First Name', required: true },
        { name: 'middleName', label: 'Middle Name' },
        { name: 'lastName', label: 'Last Name', required: true },
    ];

    const columns = fields.map(({ name, label }) => ({
        title: label,
        dataIndex: name,
        key: name,
    }));

    return (
        <div className="add-student-container">
            <h1>User Details</h1>
            <Button type="primary" onClick={showModal}>Add User</Button>

            <Modal
                title="Add User"
                open={visible}
                onCancel={handleCancel}
                footer={null}
                className="add-student-modal"
            >
                <Form form={form} onFinish={onFinish} layout="vertical">
                    {fields.map(({ name, label, required }) => (
                        <Form.Item
                            key={name}
                            name={name}
                            label={label}
                            rules={required ? [{ required: true, message: `Please enter ${label.toLowerCase()}!` }] : []}
                        >
                            <Input />
                        </Form.Item>
                    ))}
                    <Button type="primary" htmlType="submit" className="add-student-btn">
                        Add User
                    </Button>
                </Form>
            </Modal>

            <Table
                dataSource={users}
                columns={columns}
                rowKey="userId"
                className="add-student-table"
            />
        </div>
    );
};

export default UserManagement;
