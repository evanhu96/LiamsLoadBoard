// Import necessary packages
import { useQuery } from "@apollo/client";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { GET_LOADS } from "../utils/queries";
import Load from "./Load";

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
const LoadBoard = ({ notificationFilter, textsFilter }) => {
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [textsOnly, setTextsOnly] = useState(false);
  const [sortBy, setSortBy] = useState({ column: "age", order: "asc" });
  const [sortedRows, setSortedRows] = useState([]);
  // Table rows can be generated based on the data props if there are multiple records.
  // Define a style object for the Notes column
  const { loading, data, error, refetch } = useQuery(GET_LOADS);
  var rows;
  if (!loading) {
    rows = data.loads;
  }
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
  } else if (error) {
    console.log("error", error);
  }

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
  console.log("rows", rows);
  useEffect(() => {
    if (!rows) return;
    setSortedRows(
      [...rows].sort((a, b) => {
        if (sortBy.column === "distance") {
          return sortBy.order === "asc" ? a.trip - b.trip : b.trip - a.trip;
        } else if (sortBy.column === "age") {
          // console.log()
          return sortBy.order === "asc"
            ? parseInt(b.age.slice(0, -1)) - parseInt(a.age.slice(0, -1))
            : parseInt(a.age.slice(0, -1)) - parseInt(b.age.slice(0, -1));
        } else if (sortBy.column === "deadhead") {
          return sortBy.order === "asc"
            ? a.currentDeadhead - b.currentDeadhead
            : b.currentDeadhead - a.currentDeadhead;
        } else if (sortBy.column === "rate") {
          return sortBy.order === "asc" ? a.rate - b.rate : b.rate - a.rate;
        } else if (sortBy.column === "profit") {
          return sortBy.order === "asc"
            ? a.profit - b.profit
            : b.profit - a.profit;
        } else {
          // Default: maintain current order
          return 0;
        }
      })
    );
  }, [sortBy, rows]);
  return (
    <Container>
      <Button
        variant="primary"
        onClick={() => {
          setFavoritesOnly(!favoritesOnly);
          setTextsOnly(false);
        }}
      >
        <FontAwesomeIcon icon={faStar} style={{ color: "#ffff00" }} />
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          setTextsOnly(!textsOnly);
          setFavoritesOnly(false);
        }}
      >
        <FontAwesomeIcon icon={faStar} style={{ color: "#24e316" }} />
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Contact</th>
            <th>Contact2</th>
            <th>Company</th>
            <th onClick={() => handleSort("rate")}>Rate</th>
            <th onClick={() => handleSort("profit")}>Profit</th>
            {/* <th>Total Time</th> */}
            <th>Origin</th>
            <th>Destination</th>
            <th>Dates</th>
            <th onClick={() => handleSort("distance")}>trip</th>
            <th onClick={() => handleSort("deadhead")}>Deadhead</th>
            <th>hotspot</th>
            <th>hsCity</th>
            <th onClick={() => handleSort("age")}>age</th>
          </tr>
        </thead>
        <tbody>
          {rows &&
            sortedRows.map((row, index) => (
              <Load
                key={index}
                row={row}
                favoritesOnly={favoritesOnly}
                textsOnly={textsOnly}
                textsFilter={textsFilter}
                notificationFilter={notificationFilter}
              />
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default LoadBoard;
