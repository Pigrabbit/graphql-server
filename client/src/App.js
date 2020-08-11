import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';

import Items from "./components/Items";
import Orders from "./components/Orders";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>My Amazon</h1>
        <Items />
        <Orders />
      </div>
    </ApolloProvider>
  );
}

export default App;
