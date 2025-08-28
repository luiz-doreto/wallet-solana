import React from 'react';
import {
  PhantomProvider,
  AddressType,
  PhantomSDKConfig,
} from '@phantom/react-native-sdk';
import MyApp from './components/MyApp';

const providerConf: PhantomSDKConfig = {
  organizationId: 'wallet-solana-demo',
  scheme: 'walletsolana',
  embeddedWalletType: 'user-wallet',
  addressTypes: [AddressType.solana],
  apiBaseUrl: 'https://api.phantom.app/v1/wallets',
  solanaProvider: 'web3js',
  appName: 'Wallet Solana Demo',
  authOptions: {
    redirectUrl: 'walletsolana://auth',
  },
};

export default function App() {
  return (
    <PhantomProvider config={providerConf} debugConfig={{ enabled: true }}>
      <MyApp /> {/* OR <NoProvider />  only for balance check */}
    </PhantomProvider>
  );
}
