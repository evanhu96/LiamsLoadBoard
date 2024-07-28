import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { SEND_LOAD_INPUTS } from "../utils/queries";
import { useQuery } from "@apollo/client";
const cities = [
  { value: "New York", label: "New York" },
  { value: "Los Angeles", label: "Los Angeles" },
  { value: "Chicago", label: "Chicago" },
  { value: "Houston", label: "Houston" },
  { value: "Phoenix", label: "Phoenix" },
  // Add more cities as needed
];

const FormComponent = () => {
  const [location, setLocation] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [distance, setDistance] = useState("");
  const [deadhead, setDeadhead] = useState(70);
  const { loading, error, data } = useQuery(SEND_LOAD_INPUTS);
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }
  // usequery
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      location: location ? location.value : "",
      arrivalDate,
      distance,
      deadhead,
    };
    console.log("Form Data:", formData);
    // Perform form submission logic here (e.g., send data to a server)
    // await refetch();
    // refetch the query to update the UI
  };

  return (
    <Container>
      <h1>Load Information Form</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Select
                options={cities}
                value={location}
                // onChange={setLocation}
                placeholder="Enter location"
                isClearable
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formArrivalDate">
              <Stack>
                <Form.Label>Arrival Date</Form.Label>
                <DatePicker
                  selected={arrivalDate}
                  //   onChange={(date) => setArrivalDate(date)}
                  className="form-control"
                  dateFormat="yyyy/MM/dd"
                />
              </Stack>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formDistance">
              <Form.Label>Distance</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter distance"
                value={distance}
                // onChange={(e) => setDistance(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDeadhead">
              <Form.Label>Deadhead</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter deadhead"
                value={deadhead}
                // onChange={(e) => setDeadhead(e.target.value)}
                autoS
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default FormComponent;
