import React from "react";
import { Dropdown } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

const DropdownGrid = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Container>
          <Row>
            <Col className="border">
              <Dropdown.Item href="#">Column 1</Dropdown.Item>
            </Col>
            <Col className="border">
              <Dropdown.Item href="#">Column 2</Dropdown.Item>
            </Col>
          </Row>
          <Row>
            <Col className="border">
              <Dropdown.Item href="#">Column 4</Dropdown.Item>
            </Col>
            <Col className="border">
              <Dropdown.Item href="#">Column 5</Dropdown.Item>
            </Col>
          </Row>
          <Row>
            <Col className="border">
              <Dropdown.Item href="#">Column 4</Dropdown.Item>
            </Col>
            <Col className="border">
              <Dropdown.Item href="#">Column 5</Dropdown.Item>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="p-3 border">
                <strong>Notes:</strong>
                <p>Your notes go here...</p>
              </div>
            </Col>
          </Row>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownGrid;
