import React from 'react';
import Header from './src/components/Header';
import AppNavigator from './src/routes/routes';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './src/redux/store';

function App(): React.JSX.Element {
  return (
    <>
      <Provider store={store}>
        <Header />
        <AppNavigator />
      </Provider>
    </>
  );
}

export default App;
