import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { Connection, PublicKey } from '@solana/web3.js';
import nacl from "tweetnacl";
import bs58 from "bs58";
import { buildUrl, decryptPayload, encryptPayload } from '../utils';
import { APP_URL, CLUSTER, DEVNET_RPC } from '../constants';

const usePhantomConnectViewModel = () => {
  const [dappKeyPair] = useState(nacl.box.keyPair());
  const [phantomWalletPublicKey, setPhantomWalletPublicKey] =
    useState<PublicKey | null>(null);
  const [sharedSecret, setSharedSecret] = useState<Uint8Array>();
  const [session, setSession] = useState<string>();
  const [deepLink, setDeepLink] = useState<string>("");
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const initializeDeepLinks = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setDeepLink(initialUrl);
      }
    };
    initializeDeepLinks();

    const listener = Linking.addEventListener("url", handleDeepLink);
    return () => {
      listener.remove();
    };
  }, [])

  useEffect(() => {
    if (!deepLink) return;

    const url = new URL(deepLink);
    const params = url.searchParams;

    // Handle an error response from Phantom
    if (params.get("errorCode")) {
      const linkError = Object.fromEntries([...params]);
      const message =
      linkError?.errorMessage ??
        JSON.stringify(Object.fromEntries([...params]), null, 2);
      setError(message);
      return;
    }

    if (/onConnect/.test(url.href)) {
      const sharedSecretDapp = nacl.box.before(
        bs58.decode(params.get("phantom_encryption_public_key")!),
        dappKeyPair.secretKey
      );

      try {
        const connectData = decryptPayload(
          params.get("data")!,
          params.get("nonce")!,
          sharedSecretDapp
        );

        setSharedSecret(sharedSecretDapp);
        setSession(connectData.session);
        setPhantomWalletPublicKey(new PublicKey(connectData.public_key));
        console.log(`connected to ${connectData.public_key.toString()}`);
      } catch (err) {
        setError(err as string);
      }
    }

    if (/onDisconnect/.test(url.href)) {
      setPhantomWalletPublicKey(null);
      setSession('');
      console.log("disconnected");
    }
  }, [deepLink, dappKeyPair]);

  const handleDeepLink = ({ url }: {url: string}) => {
    setDeepLink(url);
  };

  const handleConnect = async () => {
    setError('');
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      cluster: CLUSTER,
      app_url: APP_URL,
      redirect_link: 'solana://onConnect',
    });

    const url = buildUrl("connect", params);
    Linking.openURL(url);
  }

  const handleGetBalance = async () => {
    setError('');
    if (!phantomWalletPublicKey) {
      return;
    }

    try {
      const connection = new Connection(DEVNET_RPC, 'confirmed');
      const balanceLamports = await connection.getBalance(
        new PublicKey(phantomWalletPublicKey)
      );
      setBalance(balanceLamports / 1e9);
    } catch (err) {
      setError(err as string)
    }
  };

  const handleDisconnect = async () => {
    setError('');
    const payload = {
      session,
    };

    try {
      const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);
      const params = new URLSearchParams({
        dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
        nonce: bs58.encode(nonce),
        redirect_link: 'solana://onDisconnect',
        payload: bs58.encode(encryptedPayload),
      });

      const url = buildUrl("disconnect", params);

      Linking.openURL(url);
    } catch (err) {
      setError(err as string);
    } finally {
      setBalance(null);
    }
  };

  return {
    handleConnect,
    handleDisconnect,
    handleGetBalance,
    phantomWalletPublicKey,
    balance,
    error
  }
}

export default usePhantomConnectViewModel;
