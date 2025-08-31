import { Button, StyleSheet, Text, View } from "react-native";
import usePhantomConnectViewModel from "../viewModels/usePhantomConnectViewModel";

const PhantomConnect = () => {
  const {handleConnect, handleDisconnect, handleGetBalance, phantomWalletPublicKey, balance, error} = usePhantomConnectViewModel();

  return (
    <View style={styles.container}>
      {phantomWalletPublicKey ? (
        <>
          <Text style={styles.text}>Carteira: {phantomWalletPublicKey.toString()}</Text>
          <Button title="Consultar Saldo" onPress={handleGetBalance} />

          {balance !== null && (
            <Text style={styles.text}>Saldo: {balance} SOL</Text>
          )}

          <Button title="Desconectar" onPress={handleDisconnect} />
        </>
      ) : (
        <>
          <Text style={styles.text}>Conectar a uma carteira Phantom</Text>
          <Button title="Conectar" onPress={handleConnect} />
        </>
      )}
      {error && <Text style={styles.textError}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  text: {
    color: '#ddd',
    fontSize: 16,
    marginTop: 10,
  },
  textError: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  }
});

export default PhantomConnect;
