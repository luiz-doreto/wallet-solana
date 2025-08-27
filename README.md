# Wallet Solana Demo (W.I.P)
A React Native mobile application that demonstrates integration with Phantom Wallet for Solana blockchain interactions. This project showcases how to connect to Phantom Wallet, manage accounts, and interact with the Solana network.

(W.I.P)
Basically testing two different approaches. With and without the Phantom Wallet SDK.

## Features

- 🔗 **Phantom Wallet Integration**: Seamless connection to Phantom Wallet using the official React Native SDK
- 🌐 **Multi-Platform Support**: Works on iOS, Android, and Web platforms
- 🔐 **Secure Authentication**: Google OAuth integration for wallet connection
- 💰 **Solana Network Support**: Full integration with Solana blockchain
- 📱 **Deep Link Support**: Handles wallet connections via deep links

## Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and build tools
- **@phantom/react-native-sdk** - Official Phantom Wallet SDK
- **@solana/web3.js** - Solana Web3 JavaScript API
- **TypeScript** - Type-safe development
- **Expo Router** - Navigation and routing

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Phantom Wallet](https://phantom.app/) (mobile app for testing)

## Usage

### Running the App

- **iOS Simulator**: `npm run ios`
- **Android Emulator**: `npm run android`
- **Web Browser**: `npm run web`

### Connecting to Phantom Wallet

1. Open the app on your device
2. Tap the "Connect Phantom" button
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
npm run web

# Code formatting
npm run format
npm run format_check

# Linting
npm run lint
npm run lint_fix
```

## Project Structure

```
wallet-solana/
├── App.tsx                 # Main app component with Phantom provider
├── components/
│   ├── MyApp.tsx          # Main app logic and UI
│   └── NoProvider.tsx     # Alternative implementation without SDK
├── assets/                # App icons and images
├── app.json              # Expo configuration
└── package.json          # Dependencies and scripts
```

## Configuration

The app is configured with the following Phantom SDK settings:

- **Organization ID**: `wallet-solana-demo`
- **URL Scheme**: `walletsolana`
- **Embedded Wallet Type**: `user-wallet`
- **Address Types**: Solana addresses
- **API Base URL**: `https://api.phantom.app/v1/wallets`
- **Provider**: Web3.js

## Deep Linking

The app supports deep linking for wallet connections. The URL scheme `walletsolana://` is used for handling authentication redirects and wallet interactions.

## Acknowledgments

- [Phantom Wallet](https://phantom.app/) for the React Native SDK
- [Solana Labs](https://solana.com/) for the Web3.js library
- [Expo](https://expo.dev/) for the development platform
