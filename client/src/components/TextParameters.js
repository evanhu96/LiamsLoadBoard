import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
const { SEND_TEXT_INPUTS } = require("../utils/queries");
const { useQuery } = require("@apollo/client");

const InputModal = ({ show, handleClose, setTextFilter }) => {
  const [distance, setDistance] = useState(null);
  const [deadhead, setDeadhead] = useState(null);
  const [profit, setProfit] = useState(null);
  const [time, setTime] = useState(null);
  const [textParams, setTextParams] = useState({
    textDistance: 1,
    textDeadhead: 1,
    textProfit: 1,
    textTime: 3,
  });

  // get current date in 07/24 format
  const { data, error, refetch } = useQuery(SEND_TEXT_INPUTS, {
    variables: {
      textDistance: distance,
      textDeadhead: deadhead,
      textProfit: profit,
      textTime: time,
    },
  });
  const handleSave = () => {
    setTextParams({
      textDistance: distance,
      textDeadhead: deadhead,
      textProfit: profit,
      textTime: time,
    });
    setTextFilter({
      distance: distance,
      deadhead: deadhead,
      profit: profit,
      time: time,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSave();
    console.log(distance, deadhead, profit, time);
    console.log("submitting");
    await refetch({
      textDistance: parseInt(distance),
      textDeadhead: parseInt(deadhead),
      textProfit: parseInt(profit),
      textTime: parseInt(time),
    });
    handleClose();
  };
  const handleNoSubmit = () => {
    setDistance(textParams.textDistance);
    setDeadhead(textParams.textDeadhead);
    setProfit(textParams.textProfit);
    setTime(textParams.textTime);
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

          {/* <Form.Group controlId="formTime">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group> */}
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
