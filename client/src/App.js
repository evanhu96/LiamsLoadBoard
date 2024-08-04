import React from "react";
import FormComponent from "./components/FormComponent";
import LoadBoard from "./components/LoadBoard";

// import Test from "./Test";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import loads from "./loads.json";

import { BrowserRouter as Router } from "react-router-dom";

// import json loads

const httpLink = createHttpLink({
  // uri: "http://localhost:3001/graphql",
  // uri: "http://http://18.119.85.42/graphql",
  // uri: "https://sportsbrew.online/graphql",
  uri: "https://sportsbrew.online:3001/graphql",

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
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container mt-5">
          <h1 className="mb-4">Liams LoadBoard</h1>
          {/* <Test/> */}
          <FormComponent />
          <ListGroup>
            <LoadBoard rows={Object.values(loads)} />
          </ListGroup>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
