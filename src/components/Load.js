import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup, Stack } from "react-bootstrap";

const Load = ({ index, row }) => {
  return (
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
          <p style={{ marginBottom: "0" }}>{row.deadheadFromHotspot} from</p>
          <p style={{ color: "red" }}> {row.hotspot}</p>
        </Stack>
      </td>
      <td>{row.age}</td>
      <td>{row.notes}</td>
    </tr>
  );
};



export default Load;
