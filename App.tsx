import React from 'react';
import {StoreProvider} from './android/app/src/stores/StoreContext';
import AppNavigator from './android/app/src/navigation/AppNavigator';

export default function App() {
  return (
    <StoreProvider>
      <AppNavigator />
    </StoreProvider>
  );
}
