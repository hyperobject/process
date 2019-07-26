import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import "./style/index.css";
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache, ApolloLink } from "apollo-boost";
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http';

const httpLink = createHttpLink({ uri: "https://wip-db.herokuapp.com/v1/graphql" });

const authLink = new ApolloLink((operation, forward) => {
    if (!forward) {
        return null
    }
  
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        // "x-hasura-admin-secret": 'XMkUGiXSpN;EYH-waDiRZ3R.Y3FXsCbF1' 
        "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET 
      }
    });
  
    // Call the next link in the middleware chain.
    return forward(operation);
  });
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

// or you can use `import gql from 'graphql-tag';` instead



ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

