import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Modal, Table, Popconfirm, Spin } from 'antd';
import axios from 'axios';
import './AddStudent.css';

const API_URL = 'http://localhost:5000/api/students';

const AddStudent = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  const fields = [
    { name: 'idNumber', label: 'ID Number', required: true },
    { name: 'firstName', label: 'First Name', required: true },
    { name: 'middleName', label: 'Middle Name' },
    { name: 'lastName', label: 'Last Name', required: true },
    { name: 'course', label: 'Course', required: true },
    { name: 'year', label: 'Year', required: true },
  ];

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to fetch students. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  const showModal = (student = null) => {
    setVisible(true);
    setEditingStudent(student);
    if (student) {
      form.setFieldsValue(student);
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
    setEditingStudent(null);
  };

  const onFinish = async (values) => {
    setLoading(true);
    
    try {
      if (editingStudent) {
        // Update existing student
        await axios.put(`${API_URL}/${editingStudent.idNumber}`, values);
        notification.success({
          message: 'Student Updated',
          description: `Student ${values.firstName} ${values.lastName} has been updated.`,
        });
      } else {
        // Add new student
        await axios.post(API_URL, values);
        notification.success({
          message: 'Student Added',
          description: `Student ${values.firstName} ${values.lastName} has been added.`,
        });
      }
      
      // Refresh student list
      fetchStudents();
      form.resetFields();
      setVisible(false);
      setEditingStudent(null);
    } catch (error) {
      console.error('Error saving student:', error);
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'Failed to save student. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (student) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${student.idNumber}`);
      notification.info({ 
        message: 'Student Deleted',
        description: `Student ${student.firstName} ${student.lastName} has been deleted.`
      });
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to delete student. Please try again.'
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
          <Popconfirm
            title="Are you sure you want to delete this student?"
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
      <h1>Student Details</h1>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Add Student
      </Button>

      <Modal
        title={editingStudent ? 'Edit Student' : 'Add Student'}
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
                <Input disabled={name === 'idNumber' && editingStudent} />
              </Form.Item>
            ))}
            <Button type="primary" htmlType="submit" className="add-student-btn" loading={loading}>
              {editingStudent ? 'Update Student' : 'Add Student'}
            </Button>
          </Form>
        </Spin>
      </Modal>

      <Spin spinning={loading}>
        <Table
          dataSource={students}
          columns={columns}
          rowKey="idNumber"
          className="add-student-table"
        />
      </Spin>
    </div>
  );
};

export default AddStudent;
