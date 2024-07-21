// Import necessary packages
import React from "react";
import { Table, Container, Stack } from "react-bootstrap";

// Load component that accepts props
const LoadBoard = ({ loads }) => {
  // Table rows can be generated based on the data props if there are multiple records.
console.log(loads);
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Phone Number</th>
            <th>Company</th>
            <th>Email</th>
            <th>Rate</th>
            <th>Profit</th>
            <th>Total Time</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Dates</th>
            <th>Distance</th>
            <th>Deadhead</th>
            <th>Hotspot</th>
            <th>Age</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {loads.map((row, index) => (
            <tr key={index}>
              <td>
                <a href={row.phoneNumber}>{row.phoneNumber}</a>
              </td>
              <td>{row.company}</td>
              <td>
                {" "}
                <a href={row.email}>{row.email}</a>
              </td>
              <td>{row.rate}</td>
              <td>{row.profit}</td>
              <td>{row.totalTime}</td>
              <td>{row.origin}</td>
              <td>{row.destination}</td>
              <td>{row.dates}</td>
              <td>{row.distance}</td>
              <td>{row.deadhead}</td>
              <td>
                <Stack>
                  <p style={{ marginBottom: "0" }}>
                    {row.deadheadFromHotspot} from
                  </p>
                  <p style={{ color: "red" }}> {row.hotspot}</p>
                </Stack>
              </td>
              <td>{row.age}</td>
              <td>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default LoadBoard;
