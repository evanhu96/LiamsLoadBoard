import { faStar, faMobile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import FormComponent from "./components/FormComponent";
import LoadBoard from "./components/LoadBoard";
import NotificationParameters from "./components/NotificationParameters";
import TextParameters from "./components/TextParameters";
// import Test from "./Test";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";

// import json loads

const httpLink = createHttpLink({
  // uri: "http://localhost:3001/graphql",
  // uri: "http://http://18.119.85.42/graphql",
  uri: "https://sportsbrew.online/graphql",

  // Replace with your server's GraphQL endpoint
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({}),
});
const filterObject = {
  distance : 0,
  deadhead : 0,
  profit : 0,

}
function App() {
  console.log("in App.js");
  const [modalShow, setModalShow] = useState(false);
  const [textModalShow, setTextModalShow] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState(filterObject);
  const [textFilter, setTextFilter] = useState(filterObject);
  console.log(textModalShow, "textModalShow");
  console.log(modalShow, "modalShow");
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container mt-5">
          <h1 className="mb-4">Liams LoadBoard</h1>
          {/* <Test/> */}
          <Button variant="primary" onClick={() => setModalShow(true)}>
            <FontAwesomeIcon icon={faStar} style={{ color: "#ffff00" }} />
          </Button>
          <Button variant="primary" onClick={() => setTextModalShow(true)}>
            <FontAwesomeIcon icon={faMobile} style={{ color: "#24e316" }} />
          </Button>
          <NotificationParameters
            show={modalShow}
            handleClose={() => setModalShow(false)}
            setNotificationFilter = {setNotificationFilter}
          />
          <TextParameters
            show={textModalShow}
            handleClose={() => setTextModalShow(false)}
            setTextFilter = {setTextFilter}
          />
          <FormComponent />
          <LoadBoard textFilter={textFilter} notificationFilter={notificationFilter} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
