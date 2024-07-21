import React from "react";
import LoadBoard from "./components/LoadBoard";
import FormComponent from "./components/FormComponent";
// import Test from "./Test";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
// import json loads
import loads from "./loads.json";
function App() {
  console.log(loads);
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Liams LoadBoard</h1>
      <FormComponent />
      <ListGroup>
        <LoadBoard rows={Object.values(loads)} />
      </ListGroup>
    </div>
  );
}

export default App;
