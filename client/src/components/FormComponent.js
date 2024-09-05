import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { SEND_LOAD_INPUTS } from "../utils/queries";
import { GET_CITIES } from "../utils/queries";
const FormComponent = () => {
  const {
    data: citiesData,
    loading: citiesLoading,
    error: citiesError,
  } = useQuery(GET_CITIES);
  const [location, setLocation] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [distance, setDistance] = useState(1000);
  const [deadhead, setDeadhead] = useState(70);
  const [destination, setDestination] = useState(1000);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // get current date in 07/24 format
  const { loading, error, data, refetch } = useQuery(SEND_LOAD_INPUTS, {
    variables: {
      location: location ? location.value : "Tobyhanna, PA",
      arrivalDate,
      dates: "dateRange",
      distance,
      deadhead,
    },
  });

  if (error) {
    console.log(error);
  }

  // usequery
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      location: location ? location.value : "Tobyhanna, PA",
      arrivalDate,
      dates: "9/999",
      distance,
      deadhead,
      destination,
    };
    console.log("Form Data:", formData);
    // Perform form submission logic here (e.g., send data to a server)
    await refetch({
      location: location ? location.value : "Tobyhanna, PA",
      arrivalDate,
      dates: "9/999",
      distance,
      deadhead,
    });
    // refetch the query to update the UI
  };
  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <Container>
      <h1>Load Information Form</h1>
      <Form>
        <Row>
          <Col md={4}>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Select
                options={
                  citiesData
                    ? citiesData.cities.map((city) => ({
                        value: city,
                        label: city,
                      }))
                    : []
                }
                value={location}
                onChange={setLocation}
                placeholder="Enter location"
                isClearable
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formArrivalDate">
              <Stack>
                <Form.Label>Arrival Date</Form.Label>
                <DatePicker
                  selected={arrivalDate}
                  onChange={(date) => setArrivalDate(date)}
                  className="form-control"
                  dateFormat="MM/dd"
                />
              </Stack>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="dates">
              <Stack>
                <Form.Label>Dates</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={onDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  isClearable={true}
                  dateFormat="MM/dd"
                />
              </Stack>
            </Form.Group>
          </Col>
        </Row>
        {/* space evenly */}
        <Row className="justify-content-md-center">
          <Col md={4}>
            <Form.Group controlId="formDestination">
              <Form.Label>Destination</Form.Label>
              <Select
                options={
                  citiesData
                    ? citiesData.cities.map((city) => ({
                        value: city,
                        label: city,
                      }))
                    : []
                }
                value={location}
                onChange={setLocation}
                placeholder="Enter destination"
                isClearable
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formDistance">
              <Form.Label>Distance</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formDeadhead">
              <Form.Label>Deadhead</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter deadhead"
                value={deadhead}
                onChange={(e) => setDeadhead(e.target.value)}
                autoS
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default FormComponent;
