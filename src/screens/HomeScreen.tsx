import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useHomeViewModel from '../viewModels/useHomeViewModel';

const HomeScreen = () => {
  const {balance, getBalance, publicKey} = useHomeViewModel();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phantom + Solana POC</Text>

      {publicKey && (
        <>
          <Text style={styles.text}>Wallet: {publicKey}</Text>
          <Button title="Mostrar saldo" onPress={getBalance} />
        </>
      )}

      {balance !== null && (
        <Text style={styles.text}>Saldo: {balance} SOL</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
  },
  text: {
    color: '#ddd',
    marginTop: 10,
  },
});

export default HomeScreen;
