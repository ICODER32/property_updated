import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { onError } from 'apollo-link-error';
import { ApolloLink, concat, from } from 'apollo-link';

const httpLink = new HttpLink({
    uri: '/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = from([errorLink, httpLink]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});

export default client;
