import {
  faEnvelope,
  faExclamationCircle,
  faPhone,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Stack, Button } from "react-bootstrap";
import DetailDropdown from "./DetailDropdown";
const IconIndicator = ({ input }) => {
  let icon = faExclamationCircle; // Default icon for neither email nor phone
  if (input === "N")
    return (
      <FontAwesomeIcon
        icon={faExclamationCircle}
        style={{ color: "#ff0000" }}
      />
    );
  if (input === "E") {
    icon = faEnvelope; // Email icon
  } else if (input === "P") {
    icon = faPhone; // Phone icon
  }
  return <FontAwesomeIcon icon={icon} style={{ color: "#74C0FC" }} />;
};

const Load = ({ index, row, favoritesOnly }) => {
  const [comments, setComments] = useState("");

  // use this for accurate last posted times
  const [active, setActive] = useState(true);
  const now = Date.now();

  const [selectedRow, setSelectedRow] = useState(null);
  // State to hold the value retrieved from local storage
  const [hash, setHash] = useState("");

  // useEffect to initialize local storage and state
  useEffect(() => {
    // Check if 'userHash' is already in local storage
    const savedHash = localStorage.getItem(row.hash);
    if (savedHash) {
      // If 'userHash' exists, use it to set the state
      setHash(savedHash);
      setActive(JSON.parse(savedHash).active);
    } else {
      // If 'userHash' does not exist, set a default value and store it in local storage
      const defaultHash = row.hash;
      localStorage.setItem(row.hash, JSON.stringify({ active: true }));
      setHash(defaultHash);
    }
  }, [row]); // Empty dependency array means this effect runs only once after the initial render
  // useEffect to update local storage whenever the hash changes
  useEffect(() => {
    localStorage.setItem("userHash", hash);
  }, [hash]);
  if (favoritesOnly && !row.favorites) return;
  const handleRowClick = (row) => {
    const localStorageObject = JSON.parse(localStorage.getItem(row.hash));
    localStorageObject.clicked = true;
    localStorage.setItem(row.hash, JSON.stringify(localStorageObject));
    if (!selectedRow) setSelectedRow(row);
    else setSelectedRow(null);
  };
  const handleRowHover = (row) => {
    const localStorageObject = JSON.parse(localStorage.getItem(row.hash));
    localStorageObject.hovered = true;
    localStorage.setItem(row.hash, JSON.stringify(localStorageObject));
  };

  const notesCellStyle = {
    maxWidth: "250px",
    overflowWrap: "break-word",
    wordBreak: "break-word",
    whiteSpace: "normal", // Ensure text wraps to the next line
  };
  // check if contact is email or phone number
  const emailOrPhone = checkEmailOrPhoneNumber(row.contact);
  const emailOrPhone2 = checkEmailOrPhoneNumber(row.clickNumber);
  const minutesSinceLastScene = Math.floor((now - row.lastScene) / 60000);
  const minutesSinceLastPosted = Math.floor((now - row.lastPosted) / 60000);
  if (active) {
    return (
      <>
        <tr
          key={index}
          onClick={() => handleRowClick(row)}
          onMouseEnter={() => handleRowHover(row)}
        >
          <td style={{ color: "blue", padding: "10px" }}>
            <IconIndicator input={emailOrPhone} />
          </td>
          <td style={{ color: "blue", padding: "10px" }}>
            <IconIndicator input={emailOrPhone2} />
          </td>
          <td>{row.company}</td>

          <td>{row.rate}</td>
          <td>{row.profit}</td>
          <td>{row.origin}</td>
          <td>{row.destination}</td>
          <td>{row.dates}</td>
          <td>{row.trip}</td>
          <td>{row.currentDeadhead}</td>
          <td>{row.hotspotDistance} from</td>
          <td>{row.hotspot}</td>
          <td>{minutesSinceLastScene}</td>
          <td>{minutesSinceLastPosted}</td>
          <td>
            <FontAwesomeIcon
              icon={faClose}
              style={{ color: "#ff0000", cursor: "pointer" }}
              onClick={() => {
                const localStorageObject = JSON.parse(
                  localStorage.getItem(row.hash)
                );
                localStorageObject.active = false;
                localStorage.setItem(
                  row.hash,
                  JSON.stringify(localStorageObject)
                );
                setActive(false);
              }}
            />
          </td>
        </tr>
        <React.Fragment key={index}>
          {selectedRow === row && (
            <DetailDropdown
              row={row}
              comments={comments}
              setComments={setComments}
            />
          )}
        </React.Fragment>
      </>
    );
  }
};

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
