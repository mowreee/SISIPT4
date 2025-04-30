import React, { useState } from 'react';
import { Form, Input, Button, notification, Modal, Table, Popconfirm } from 'antd';
import './AddStudent.css';

const AddStudent = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const fields = [
    { name: 'idNumber', label: 'ID Number', required: true },
    { name: 'firstName', label: 'First Name', required: true },
    { name: 'middleName', label: 'Middle Name' },
    { name: 'lastName', label: 'Last Name', required: true },
    { name: 'course', label: 'Course', required: true },
    { name: 'year', label: 'Year', required: true },
  ];

  const showModal = (index = null) => {
    setVisible(true);
    setEditingIndex(index);
    if (index !== null) {
      form.setFieldsValue(students[index]);
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
    setEditingIndex(null);
  };

  const onFinish = (values) => {
    if (editingIndex !== null) {
      const updated = [...students];
      updated[editingIndex] = values;
      setStudents(updated);
      notification.success({
        message: 'Student Updated',
        description: `Student ${values.firstName} ${values.lastName} has been updated.`,
      });
    } else {
      setStudents([...students, values]);
      notification.success({
        message: 'Student Added',
        description: `Student ${values.firstName} ${values.lastName} has been added.`,
      });
    }

    form.resetFields();
    setVisible(false);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
    notification.info({ message: 'Student Deleted' });
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
      render: (_, __, index) => (
        <>
          <Button size="small" onClick={() => showModal(index)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this student?"
            onConfirm={() => handleDelete(index)}
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
      <h1>Student Details</h1>
      <Button type="primary" onClick={() => showModal()}>Add Student</Button>

      <Modal
        title={editingIndex !== null ? 'Edit Student' : 'Add Student'}
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
            {editingIndex !== null ? 'Update Student' : 'Add Student'}
          </Button>
        </Form>
      </Modal>

      <Table
        dataSource={students}
        columns={columns}
        rowKey="idNumber"
        className="add-student-table"
      />
    </div>
  );
};

export default AddStudent;
