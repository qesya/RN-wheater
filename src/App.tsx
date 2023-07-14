import * as React from 'react';
import { ScreenManager } from '@navigation/ScreenManager';
import { Provider } from 'react-redux';
import { persistor, store } from '@store';
import { PersistGate } from 'redux-persist/integration/react';
import type { } from 'redux-thunk/extend-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ScreenManager />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
