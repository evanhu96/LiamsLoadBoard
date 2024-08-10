import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const InputModal = ({ show, handleClose }) => {
  const [distance, setDistance] = useState("");
  const [deadhead, setDeadhead] = useState("");
  const [profit, setProfit] = useState("");
  const [time, setTime] = useState("");
  const [distanceSaved, setDistanceSaved] = useState("");
  const [deadheadSaved, setDeadheadSaved] = useState("");
  const [profitSaved, setProfitSaved] = useState("");
  const [timeSaved, setTimeSaved] = useState("");

  const handleSave = () => {
    setDistanceSaved(distance);
    setDeadheadSaved(deadhead);
    setProfitSaved(profit);
    setTimeSaved(time);
  };
  const handleSubmit = () => {
    const data = { distance, deadhead, profit, time };
    handleSave(data);

    handleClose();
  };
  const handleNoSubmit = () => {
    setDistance(distanceSaved);
    setDeadhead(deadheadSaved);
    setProfit(profitSaved);
    setTime(timeSaved);

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
