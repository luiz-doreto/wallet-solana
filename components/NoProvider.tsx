import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Connection, PublicKey } from "@solana/web3.js";

const DEVNET_RPC = "https://api.devnet.solana.com";
const DAPP_URL_SCHEME = "dapp-poc://onConnect"; // mesmo que definiu no app.json

export default function App() {
  const [publicKey, setPublicKey] = useState<string | null>("");
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const handler = ({ url }: { url: string }) => {
      if (url.startsWith(DAPP_URL_SCHEME)) {
        const params = new URL(url).searchParams;
        const pubKey = params.get("public_key");
        if (pubKey) {
          setPublicKey(pubKey);
        }
      }
    };

    const sub = Linking.addEventListener("url", handler);
    return () => sub.remove();
  }, []);

  const connectPhantom = async () => {
    const dappUrl = encodeURIComponent(DAPP_URL_SCHEME);
    const url = `https://phantom.app/ul/v1/connect?app_url=${dappUrl}&redirect_link=${dappUrl}`;
    
    await WebBrowser.openBrowserAsync(url);
  };

  const getBalance = async () => {
    if (!publicKey) {
      return;
    }

    try {
      const connection = new Connection(DEVNET_RPC, "confirmed");
      const balanceLamports = await connection.getBalance(new PublicKey(publicKey));
      setBalance(balanceLamports / 1e9);
    } catch (err) {
      console.error("Erro ao buscar saldo:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phantom + Solana POC</Text>

      <Button title="Conectar Phantom" onPress={connectPhantom} />

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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111"
  },
  title: { 
    fontSize: 20, 
    color: "#fff", 
    marginBottom: 20
  },
  text: { 
    color: "#ddd", 
    marginTop: 10 
  },
});
