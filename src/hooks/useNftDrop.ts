import {
  useClaimedNFTSupply,
  useContract,
  useUnclaimedNFTSupply,
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const";

type TNftDropContractProps = {
  loadingUnclaimedSupply: boolean;
  loadingClaimedSupply: boolean;
  unclaimedNfts: number;
  claimedNfts: number;
  totalSupply: number;
};

export const useNftDrop = () => {
  const { data: nftDrop } = useContract(CONTRACT_ADDRESS, "nft-drop");
  const { data: _unclaimedNfts, isLoading: loadingUnclaimedSupply } =
    useUnclaimedNFTSupply(nftDrop);
  const unclaimedNfts = _unclaimedNfts ? _unclaimedNfts.toNumber() : 0;
  const { data: _claimedNfts, isLoading: loadingClaimedSupply } =
    useClaimedNFTSupply(nftDrop);
  const claimedNfts = _claimedNfts ? _claimedNfts.toNumber() : 0;
  const totalSupply = unclaimedNfts + claimedNfts;

  const value: TNftDropContractProps = {
    loadingClaimedSupply,
    loadingUnclaimedSupply,
    unclaimedNfts,
    claimedNfts,
    totalSupply,
  };
  return value;
};
