/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';

import AppNavigator from './src/navigation';

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="transparent" />
    <AppNavigator />
  </>
);

export default App;
