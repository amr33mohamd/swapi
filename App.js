/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import type {Node} from 'react';
import {StyleSheet} from 'react-native';
import Home from './src/components/Home';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/constants/connection';

const App: () => Node = () => {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

export default App;
