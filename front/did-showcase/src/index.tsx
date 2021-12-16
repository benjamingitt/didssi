import React from 'react';
import ReactDOM from 'react-dom';
import {apolloClient} from './utils/ApolloClient';
import {ApolloProvider} from '@apollo/client';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {store} from './store';
import {history} from './routing';
import {App} from './App';
import {GlobalStyles} from './globalStyles';
import reportWebVitals from './reportWebVitals';
import packageJson from '../package.json';

console.log(`App version: ${packageJson.name} (${packageJson.version})`);

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <Provider store={store}>
                <Router history={history}>
                    <App/>
                    <GlobalStyles/>
                </Router>
            </Provider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
