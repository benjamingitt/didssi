import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const cache = new InMemoryCache();

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token');

    if (token) {
        return {
            headers: {
                ...headers,
                authorization: token
            }
        };
    } else {
        return {
            headers
        };
    }
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    connectToDevTools: process.env.REACT_APP_PUBLIC_DEBUG === 'true'
});
