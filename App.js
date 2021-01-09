import { registerRootComponent } from 'expo';
import React from 'react';
import 'react-native-gesture-handler';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './src/modules';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigations/Navigation';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
