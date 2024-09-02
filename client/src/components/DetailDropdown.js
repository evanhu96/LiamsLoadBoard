import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
const DetailDropdown = ({ row, comments, setComments }) => {
  const textareaRef = useRef(null);
  // use effect to initialize the comments state with the value from local storage
  useEffect(() => {
    // Check if 'userComments' is already in local storage
    const savedComments = localStorage.getItem(row.hash);
    if (savedComments) {
      // If 'userComments' exists, use it to set the state
      setComments(JSON.parse(savedComments).comments);
    } else {
      // If 'userComments' does not exist, set a default value and store it in local storage
      const defaultComments = "";
      localStorage.setItem(
        row.hash,
        JSON.stringify({ comments: defaultComments })
      );
      setComments(defaultComments);
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const handleInputChange = (e) => {
    setComments(e.target.value);
    const localStorageObject = JSON.parse(localStorage.getItem(row.hash));
    localStorageObject.comments = e.target.value;
    localStorage.setItem(row.hash, JSON.stringify(localStorageObject));
  };
  useEffect(() => {
    // Adjust the height of the textarea based on its scroll height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to auto to shrink if needed
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on content
    }
  }, [comments]); // Run effect when comments change
  const {
    size,
    commodity,
    comments: notes,
    phone,
    length,
    weight,
  } = JSON.parse(row.clickDetails);

  return (
    <tr>
      <td colSpan={15}>
        <Container>
          <Row>
            <Col className="border">
              <Dropdown.Item href="#">Phone</Dropdown.Item>
            </Col>
            <Col className="border">
              <Dropdown.Item href="#">{phone}</Dropdown.Item>
            </Col>
          </Row>
          <Row>
            <Col className="border">
              <Dropdown.Item href="#">Other Contact</Dropdown.Item>
            </Col>
            <Col className="border">
              <Dropdown.Item href="#">{row.contact}</Dropdown.Item>
            </Col>
          </Row>
          <Row>
            <Col className="border">
              <Dropdown.Item href="#">{size}</Dropdown.Item>
            </Col>
            <Col className="border">
              <Dropdown.Item href="#">{length}</Dropdown.Item>
            </Col>
          </Row>
          <Row>
            <Col className="border">
              <Dropdown.Item href="#">{commodity}</Dropdown.Item>
            </Col>
            <Col className="border">
              <Dropdown.Item href="#">{weight}</Dropdown.Item>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="p-3 border">
                <strong>Notes:</strong>
                <p>{notes}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="p-3 border">
                <strong>Comments:</strong>
                <textarea
                  ref={textareaRef}
                  style={{
                    width: "500px",
                    resize: "vertical", // Allow only vertical resizing
                    boxSizing: "border-box", // Ensure padding/border is included in width/height calculations
                  }}
                  value={comments}
                  onChange={handleInputChange}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </td>
    </tr>
  );
};

export default DetailDropdown;
