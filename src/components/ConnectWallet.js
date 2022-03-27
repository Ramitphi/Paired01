import { ethers } from "ethers";
import Web3Modal from "web3modal";

import React, { useState } from "react";

const ConnectWallet = () => {
  const [address, setAddress] = useState();

  async function connect() {
    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
    });
    const instance = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    const ad = await signer.getAddress();

    setAddress(ad);

    console.log(address);
  }

  return (
    <div>
      <button onClick={() => connect()}>
        {address
          ? `${address.slice(0, 12)}....${address.slice(-5)}`
          : "Connect Wallet"}
      </button>
    </div>
  );
};

export default ConnectWallet;
