import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import PhantomConnectScreen from './src/screens/PhantomConnect';

export default function App() {
  return (
    <SafeAreaProvider>
      <PhantomConnectScreen />
    </SafeAreaProvider>
  );
}
