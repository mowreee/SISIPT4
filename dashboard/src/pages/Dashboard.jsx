import React, { useState } from 'react';
import { Button, Input, notification } from 'antd';
import './Dashboard.css';

const Dashboard = () => {
  const [color, setColor] = useState("red");
  const [firstName, setFirstName] = useState("");

  const toggleColor = () => setColor(prev => (prev === "red" ? "blue" : "red"));

  /*const handleNameSubmit = () => {
    const name = document.getElementById("fn").value;
    if (!name) {
      notification.error({
        message: 'Empty Name',
        description: 'Please enter your first name!',
      });
    } else {
      setFirstName(name);
    }
  };*/

  return (
    <div className="dashboard-container">
      <h1>Welcome to Saint Mary's University</h1>
      {/*<div className="header">
        <h2>
          My fav color is <span style={{ color }}>{color}</span>
        </h2>
        <Button type={color === "red" ? "danger" : "primary"} onClick={toggleColor}>
          {color}
        </Button>
        <p>My name is: {firstName}</p>
        <Input id="fn" placeholder="Enter your first name" style={{ marginTop: 10 }} />
        <Button type="primary" style={{ marginTop: 10 }} onClick={handleNameSubmit}>
          Submit
        </Button>
      </div>*/}
    </div>
  );
};

export default Dashboard;
