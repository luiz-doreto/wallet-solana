import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Connection, PublicKey } from '@solana/web3.js';

const DEVNET_RPC = 'https://api.devnet.solana.com';
const PB_KEY = ''; // public key

export default function App() {
  const [balance, setBalance] = useState<number | null>(null);

  const getBalance = async () => {
    if (!PB_KEY) {
      return;
    }

    try {
      const connection = new Connection(DEVNET_RPC, 'confirmed');
      const balanceLamports = await connection.getBalance(
        new PublicKey(PB_KEY)
      );
      setBalance(balanceLamports / 1e9);
    } catch (err) {
      console.error('Erro ao buscar saldo:', err);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phantom + Solana POC</Text>

      {PB_KEY && (
        <>
          <Text style={styles.text}>Wallet: {PB_KEY}</Text>
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
