import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
const { SEND_NOTIFICATION_INPUTS } = require("../utils/queries");
const { useQuery } = require("@apollo/client");

const InputModal = ({ show, handleClose }) => {
  const [distance, setDistance] = useState(5);
  const [deadhead, setDeadhead] = useState(0);
  const [profit, setProfit] = useState(0);
  const [time, setTime] = useState(0);
  const [notificationParams, setNotificationParams] = useState({
    notificationDistance: 1,
    notificationDeadhead: 1,
    notificationProfit: 1,
    notificationTime: 3,
  });
  console.log(notificationParams);

  // get current date in 07/24 format
  const { data, error, refetch } = useQuery(SEND_NOTIFICATION_INPUTS, {
    variables: {
      notificationDistance: distance,
      notificationDeadhead: deadhead,
      notificationProfit: profit,
      notificationTime: time,
    },
  });
  const handleSave = () => {
    setNotificationParams({
      notificationDistance: distance,
      notificationDeadhead: deadhead,
      notificationProfit: profit,
      notificationTime: time,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSave();
    console.log(distance, deadhead, profit, time);
    console.log("submitting");
    await refetch({
      notificationDistance: parseInt(distance),
      notificationDeadhead: parseInt(deadhead),
      notificationProfit: parseInt(profit),
      notificationTime: parseInt(time),
    });
    handleClose();
  };
  const handleNoSubmit = () => {
    setDistance(notificationParams.notificationDistance);
    setDeadhead(notificationParams.notificationDeadhead);
    setProfit(notificationParams.notificationProfit);
    setTime(notificationParams.notificationTime);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Input Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDistance">
            <Form.Label>Distance</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDeadhead">
            <Form.Label>Deadhead</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter deadhead"
              value={deadhead}
              onChange={(e) => setDeadhead(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formProfit">
            <Form.Label>Profit</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter profit"
              value={profit}
              onChange={(e) => setProfit(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formTime">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleNoSubmit}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InputModal;
