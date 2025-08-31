import { Button, StyleSheet, Text, View } from "react-native";
import usePhantomConnectViewModel from "../viewModels/usePhantomConnectViewModel";
import { SafeAreaView } from "react-native-safe-area-context";

const PhantomConnect = () => {
  const {handleConnect, handleDisconnect, handleGetBalance, phantomWalletPublicKey, balance, error} = usePhantomConnectViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Phantom Wallet + Solana POC</Text>
      </View>
      <View style={styles.content}>
        {phantomWalletPublicKey ? (
          <>
            <View style={styles.walletInfo}>
              <Text style={styles.text}>Carteira:</Text>
              <Text style={styles.text}>{phantomWalletPublicKey.toString()}</Text>
            </View>
            <View>
              {balance === null ? (
              <Button title="Consultar Saldo" onPress={handleGetBalance} />
              ) : (
                <Text style={styles.text}>Saldo: {balance} SOL</Text>
              )}
            </View>

            <Button title="Desconectar" onPress={handleDisconnect} />
          </>
        ) : (
          <View>
            <Text style={styles.text}>Conectar a uma carteira Phantom</Text>
            <Button title="Conectar" onPress={handleConnect} />
          </View>
        )}

      </View>
      <View style={styles.footer}>
        {error && <Text style={styles.textError}>{error}</Text>}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  walletInfo: {
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  footer: {
    padding: 20,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default PhantomConnect;
