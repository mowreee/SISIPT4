import React, { useState } from 'react';
import { Input, Button, List, Space, Tag } from 'antd';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import './TaskTracker.css';

const TaskTracker = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        if (!task.trim()) return;
        setTasks([...tasks, { text: task, completed: false }]);
        setTask('');
    };

    const toggleTask = (index) => {
        const updated = [...tasks];
        updated[index].completed = !updated[index].completed;
        setTasks(updated);
    };

    const removeTask = (index) => {
        const updated = [...tasks];
        updated.splice(index, 1);
        setTasks(updated);
    };

    return (
        <div className="task-tracker-container">
            <h2>Task Tracker</h2>
            <Space.Compact className="task-input-group">
                <Input
                    placeholder="Enter a task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onPressEnter={addTask}
                />
                <Button type="primary" onClick={addTask}>
                    Add
                </Button>
            </Space.Compact>

            <List
                className="task-list"
                bordered
                dataSource={tasks}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[
                            <Button
                                type={item.completed ? 'default' : 'primary'}
                                size="small"
                                icon={<CheckOutlined />}
                                onClick={() => toggleTask(index)}
                            >
                                {item.completed ? 'Undo' : 'Done'}
                            </Button>,
                            <Button
                                type="text"
                                danger
                                size="small"
                                icon={<DeleteOutlined />}
                                onClick={() => removeTask(index)}
                            >
                                Remove
                            </Button>,
                        ]}
                    >
                        <span className={item.completed ? 'completed-task' : ''}>
                            {item.completed ? <Tag color="green">Done</Tag> : <Tag color="blue">Pending</Tag>}
                            {item.text}
                        </span>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default TaskTracker;
