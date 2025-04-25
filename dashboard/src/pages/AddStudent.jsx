import React, { useState } from 'react';
import { Form, Input, Button, notification, Select, Modal, Table } from 'antd';
import './AddStudent.css';  // Import the new CSS file

const { Option } = Select;

const AddStudent = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [students, setStudents] = useState([]);

  const onFinish = (values) => {
    setStudents([...students, values]);
    form.resetFields();

    setVisible(false);

    notification.success({
      message: 'Student Added',
      description: `Student ${values.firstName} ${values.lastName} has been added.`,
    });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: 'ID Number',
      dataIndex: 'idNumber',
      key: 'idNumber',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Middle Name',
      dataIndex: 'middleName',
      key: 'middleName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
  ];

  return (
    <div className="add-student-container">
      <Button type="primary" onClick={showModal}>
        Add Student
      </Button>

      <Modal
        title="Add Student"
        visible={visible}
        onCancel={handleCancel}
        footer={null} // Disable the default footer
        className="add-student-modal"
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="idNumber"
            label="ID Number"
            rules={[{ required: true, message: 'Please enter the student ID number!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter the first name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="middleName"
            label="Middle Name"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter the last name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="course"
            label="Course"
            rules={[{ required: true, message: 'Please select the course!' }]}
          >
            <Select placeholder="Select course">
              <Option value="CS">Computer Science</Option>
              <Option value="IT">Information Technology</Option>
              <Option value="BSBA">Business Administration</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="year"
            label="Year"
            rules={[{ required: true, message: 'Please select the year!' }]}
          >
            <Select placeholder="Select year">
              <Option value="1">1st Year</Option>
              <Option value="2">2nd Year</Option>
              <Option value="3">3rd Year</Option>
              <Option value="4">4th Year</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" className="add-student-btn">
            Add Student
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
