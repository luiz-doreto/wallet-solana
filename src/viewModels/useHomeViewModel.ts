import { Connection, PublicKey } from "@solana/web3.js";
import { useState } from "react";

const PB_KEY = '6HhpQJ2q5V1duDQhqi4CxVadJL37pJw35dgvrS1y2t1a';
const DEVNET_RPC = 'https://api.devnet.solana.com';

const useHomeViewModel = () => {
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

  return {
    balance,
    getBalance,
    publicKey: PB_KEY
  }
}

export default useHomeViewModel;
