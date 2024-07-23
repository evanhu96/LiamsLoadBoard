import React from "react";
import LoadBoard from "./components/LoadBoard";
import FormComponent from "./components/FormComponent";
import Test from "./components/Test";
// import Test from "./Test";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import loads from "./loads.json";
import { GET_LOADS } from "./utils/queries";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { BrowserRouter as Router } from "react-router-dom";

// import json loads

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
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
  client
  .query({
    query: GET_LOADS,
  })
  .then((result) => console.log('Connected to backend:', result))
  .catch((error) => console.error('Error connecting to backend:', error));

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container mt-5">
          <h1 className="mb-4">Liams LoadBoard</h1>
          <Test/>
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
