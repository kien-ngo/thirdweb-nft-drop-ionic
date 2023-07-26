import { ChainId, useContract, useSwitchChain } from "@thirdweb-dev/react";
import { useState } from "react";
import { useAddress, useNetworkMismatch } from "@thirdweb-dev/react";
import { CHAIN_ID, CONTRACT_ADDRESS } from "../const";

export const useNftDropMint = () => {
  const { data: nftDrop } = useContract(CONTRACT_ADDRESS, "nft-drop");
  const address = useAddress();
  const switchNetwork = useSwitchChain();
  const isOnWrongNetwork = useNetworkMismatch();
  const [mintedSuccessfully, setMintedSuccessfully] = useState<boolean>(false);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [transactionHash, setTransactionHash] = useState<string>("");
  const mint = async (qty: number) => {
    if (!address) {
      alert("Please connect wallet");
      return;
    }
    if (isOnWrongNetwork) {
      await switchNetwork(CHAIN_ID);
      return;
    }
    setIsClaiming(true);
    setMintedSuccessfully(false);
    setErrorMessage("");

    try {
      const mintData = await nftDrop?.claim(qty);
      if (mintData && mintData.length) {
        console.log({ mintData });
        const temp = mintData[0];
        const hash = temp.receipt.transactionHash;
        setTransactionHash(hash);
      }
    } catch (error: any) {
      console.log({ errorMsg: error.message, err: error });
      if (error?.message?.includes("user rejected transaction")) {
        setErrorMessage("User rejected the transaction");
      } else if (
        error?.message?.includes(
          "missing revert data in call exception; Transaction reverted without a reason string"
        )
      ) {
        setErrorMessage(
          "You don't have enough gas for this transaction. Please make sure to have over 0.1 ETH in your wallet"
        );
      } else {
        if (
          process.env.NODE_ENV === "production" &&
          window.location.hostname === "mome.io"
        ) {
          setErrorMessage("Oops, something went wrong. Please try again");
        } else {
          setErrorMessage(error.message);
        }
      }
      setIsClaiming(false);
    } finally {
      setIsClaiming(false);
      setMintedSuccessfully(true);
    }
  };

  return {
    mint,
    mintedSuccessfully,
    isClaiming,
    errorMessage,
    setErrorMessage,
    setMintedSuccessfully,
    transactionHash,
  };
};
