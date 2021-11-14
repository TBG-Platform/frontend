import { ApolloClient, ApolloLink, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { InMemoryCache } from '@apollo/client/cache';

const SERVER_URL = 'http://localhost:4000/graphql';

const httpLink = createHttpLink({ uri: SERVER_URL });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      const { message } = err;
      console.log(`[Graphql error]: ${message}`);

      /*
      Validate if the error is related to authentication, if so, and if the user has a token
      on localStorage try to refresh the token
      */
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        const isAuthenticated = localStorage.getItem('access_token');
        if (isAuthenticated) {
          console.log('refresh user token');
          //refresh token
        }
      }
    }
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('access_token');
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, authLink, httpLink]),
});

export default client;
