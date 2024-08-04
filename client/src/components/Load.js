import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
const IconIndicator = ({ input }) => {
  let icon = faExclamationCircle; // Default icon for neither email nor phone
  if (input === "N")
    return <FontAwesomeIcon icon={faExclamationCircle} style={{ color: "#ff0000" }} />;
  if (input === "E") {
    icon = faEnvelope; // Email icon
  } else if (input === "P") {
    icon = faPhone; // Phone icon
  }
  return <FontAwesomeIcon icon={icon} style={{ color: "#74C0FC" }} />;
};

const Load = ({ index, row }) => {
  const notesCellStyle = {
    maxWidth: "250px",
    overflowWrap: "break-word",
    wordBreak: "break-word",
    whiteSpace: "normal", // Ensure text wraps to the next line
  };
  // check if contact is email or phone number
  const emailOrPhone = checkEmailOrPhoneNumber(row.contact);
  return (
    <tr key={index}>
      <td style={{ color: "blue", color: "white", padding: "10px" }}>
        <IconIndicator input={emailOrPhone} />
      </td>
      <td>{row.company}</td>
      <td>
        {" "}
        <a href={row.email}>{row.email}</a>
      </td>
      <td>{row.rate}</td>
      <td>{row.profit}</td>
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
      <td style={notesCellStyle}>{row.notes}</td>
    </tr>
  );
};
<td />;

function isEmail(input) {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
}
function isPhoneNumber(input) {
  // Regular expression for basic phone number validation
  const phoneRegex = /^\d{10}$/; // Matches a 10-digit number (e.g., 1234567890)
  return phoneRegex.test(input);
}
function checkEmailOrPhoneNumber(input) {
  if (isEmail(input)) {
    return "E";
  } else if (isPhoneNumber(input)) {
    return "P";
  } else {
    return "N";
  }
}

export default Load;
