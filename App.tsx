import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {store, persistor} from './store';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import Auth from './Auth';
import {PersistGate} from 'redux-persist/integration/react';

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Auth />
        </PersistGate>
      </Provider>
      <Toast />
    </NavigationContainer>
  );
}

export default App;
