import { useAccounts, useConnect } from '@phantom/react-native-sdk';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { Linking } from 'react-native';

const MyApp = () => {
  const { connect, isConnecting } = useConnect();
  const { addresses } = useAccounts();

  useEffect(() => {
    const handleDeepLink = (url: string) => {
      console.log('Deep link received:', url);
    };

    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    // Log initial URL if app was opened via deep link
    Linking.getInitialURL().then(url => {
      if (url) {
        console.log('Initial URL:', url);
      }
    });

    return () => subscription.remove();
  }, []);

  const handleConnect = async () => {
    try {
      const result = await connect({ provider: 'google' });
      console.log('Connected:', result);
    } catch (error) {
      console.error('Connection failed with Google provider:', error);
    }
  };

  const hasAddresses = Array.isArray(addresses) && addresses.length > 0;

  return (
    <View style={styles.container}>
      {!hasAddresses ? (
        <Button
          title={isConnecting ? 'Connecting...' : 'Connect Phantom'}
          onPress={handleConnect}
          disabled={isConnecting}
        />
      ) : (
        <Text>Connected: {addresses[0].address}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyApp;
