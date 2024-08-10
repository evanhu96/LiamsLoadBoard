// Import necessary packages
import React, { useState, useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import Load from "./Load";
import { useQuery } from "@apollo/client";
import { GET_LOADS } from "../utils/queries";
import NotificationParameters from "./NotificationParameters";
// fontawesome star symbol
const minutes = (timeString) => {
  // Check if the string is in the format 'number + h' or 'number + m'
  if (/^\d+h$/.test(timeString)) {
    // Extract the numeric part (hours) and convert to minutes
    const hours = parseInt(timeString);
    return hours * 60;
  } else if (/^\d+m$/.test(timeString)) {
    // Extract the numeric part (minutes) and convert to integer
    const minutes = parseInt(timeString);
    return minutes;
  } else {
    // Invalid input format
    throw new Error(
      'Invalid time format. Expected format: "number + h" or "number + m"'
    );
  }
};
// Load component that accepts props
const LoadBoard = ({ rows }) => {


  // Table rows can be generated based on the data props if there are multiple records.
  // Define a style object for the Notes column
  const { loading, data, error, refetch } = useQuery(GET_LOADS);
  // Refetch the data if it's not loading and there's no error
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading && !error) {
        refetch();
      }
    }, 10000); // 10000 ms = 10 seconds
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [loading, error, data, refetch]);
  // refetch if not loading
  if (!loading && data && !error) {
    const tempRows = data.loads;
    console.log("tempRows", tempRows);
  } else if (error) {
    console.log("error", error);
  } else {
    console.log("loading", loading);
  }
  const [sortBy, setSortBy] = useState({ column: null, order: "asc" });

  // Function to handle sorting
  const handleSort = (columnName) => {
    setSortBy((prevState) => ({
      column: columnName,
      order:
        prevState.column === columnName
          ? prevState.order === "asc"
            ? "desc"
            : "asc"
          : "asc",
    }));
  };
  // Define a function to sort rows
  const sortedRows = [...rows].sort((a, b) => {
    if (sortBy.column === "distance") {
      return sortBy.order === "asc"
        ? a.distance - b.distance
        : b.distance - a.distance;
    } else if (sortBy.column === "age") {
      return sortBy.order === "asc"
        ? minutes(a.age) - minutes(b.age)
        : minutes(b.age) - minutes(a.age);
    } else if (sortBy.column === "deadhead") {
      return sortBy.order === "asc"
        ? a.deadhead - b.deadhead
        : b.deadhead - a.deadhead;
    } else if (sortBy.column === "rate") {
      return sortBy.order === "asc" ? a.rate - b.rate : b.rate - a.rate;
    } else if (sortBy.column === "profit") {
      return sortBy.order === "asc" ? a.profit - b.profit : b.profit - a.profit;
    } else {
      // Default: maintain current order
      return 0;
    }
  });
  return (
    <Container>



      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Contact</th>
            <th>Company</th>
            <th onClick={() => handleSort("rate")}>Rate</th>
            <th onClick={() => handleSort("profit")}>Profit</th>
            <th>Total Time</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Dates</th>
            <th onClick={() => handleSort("distance")}>Distance</th>
            <th onClick={() => handleSort("deadhead")}>Deadhead</th>
            <th>Hotspot</th>
            <th onClick={() => handleSort("age")}>Age</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, index) => (
            <Load key={index} row={row} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default LoadBoard;
