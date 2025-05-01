import React, { useState } from 'react';
import { Button, Input, Card, Row, Col, notification } from 'antd';
import './Dashboard.css';

const Dashboard = () => {
  const [color, setColor] = useState("red");
  const [firstName, setFirstName] = useState("");

  const handleNameSubmit = () => {
    const name = document.getElementById("fn").value;
    if (name === "") {
      notification.error({
        message: 'Empty Name',
        description: 'Please enter your first name!',
      });
    } else {
      setFirstName(name);
    }
  };

  return (
    <div className="dashboard-container">
      <div>
        <h1>Welcome to Saint Mary's University</h1>
        <div className="header">
          <h2>
            My fav color is <span style={{ color: color }}>{color}</span>
          </h2>
          <Button
            className="btn"
            type={color === "red" ? "danger" : "primary"}
            onClick={() => setColor(color === "red" ? "blue" : "red")}>
            {color}
          </Button>
          <p>My name is: {firstName}</p>
          <Input
            id="fn"
            placeholder="Enter your first name"
            style={{ marginTop: '10px' }}
          />
          <Button
            className="btn"
            type="primary"
            style={{ marginTop: '10px' }}
            onClick={handleNameSubmit}>
            Submit
          </Button>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;
