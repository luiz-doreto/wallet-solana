# Phantom Wallet - Solana Demo (devnet)
A React Native mobile application that demonstrates integration with Phantom Wallet to connect to the wallet and check the account balance. In this specific case the Phantom Wallet SDK for react native WAS NOT USED.

## Features

- 🔗 **Phantom Wallet Integration**: Seamless connection to Phantom Wallet WITHOUT the SDK
- 🌐 **Multi-Platform Support**: Works on iOS, Android, and Web platforms
- 🔐 **Secure Authentication**: Google OAuth integration for wallet connection
- 💰 **Solana Network Support**: Full integration with Solana blockchain
- 📱 **Deep Link Support**: Handles wallet connections via deep links

## Tech Stack

- **React Native** - Cross-platform mobile development
- **@solana/web3.js** - Solana Web3 JavaScript API
- **TypeScript** - Type-safe development

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Phantom Wallet](https://phantom.app/) (mobile app for testing)

Extra
- Make sure to be able to execute the project directly on your physical device, this way you can validate the deep links redirection.
- **IMPORTANT**: All the tests and validations were made under `devnet` cluster.

## Usage

### Running the App

- **iOS Simulator**: `npm run ios`
- **Android Emulator**: `npm run android`

### Connecting to Phantom Wallet

1. Open the app on your device
2. Tap the "Conectar" button
3. Choose Google as your authentication provider
4. Complete the authentication process
5. Your wallet address will be displayed once connected

### Development Commands

```bash
# Start development server
npm start

# Run on specific platform
npm run android
npm run ios
```

## Deep Linking

The app supports deep linking for wallet connections. The URL scheme `solana://` is used for handling authentication redirects and wallet interactions.

## Acknowledgments

- [Phantom Wallet](https://phantom.app/) for the connections
- [Solana Labs](https://solana.com/) for the Web3.js library
