import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import toaster from "../Toast";
import { Button } from "@/common";
import "./importToken.scss";
import {
  BLOCK_EXPLORER_URL,
  CHAIN_ID,
  NETWORK_NAME,
  NETWORK_SYMBOL,
  RPC_URL,
  TOKEN_DECIMAL,
  TOKEN_SYMBOL,
} from "@/constants";

const ConnectWallet = (props: any) => {
  const approveNetwork = async () => {
    return new Promise(async (resolve, reject) => {
      const { ethereum }: any = window;
      /**IF METAMASK IS ON DIFFERENT NETWORK */
      try {
        /**SWITCH METAMASK TO OUR NETWORK */
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CHAIN_ID }], // Polygon Mainnet chainId
        });
        resolve(true);
      } catch (err: any) {
        /**IF METAMASK DOESN'T HAVE OUR NETWORK. ADD NEW NETWORK */
        if (err?.code === 4902) {
          const polygonChainId = CHAIN_ID;
          const polygonParams = {
            chainId: polygonChainId,
            chainName: NETWORK_NAME,
            nativeCurrency: {
              name: NETWORK_NAME,
              symbol: NETWORK_SYMBOL,
              decimals: TOKEN_DECIMAL,
            },
            // rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
            // blockExplorerUrls: ['https://polygonscan.com/'],
            rpcUrls: [RPC_URL],
            blockExplorerUrls: [BLOCK_EXPLORER_URL],
          };
          // Request to add the Polygon Mainnet to MetaMask
          await ethereum
            .request({
              method: "wallet_addEthereumChain",
              params: [polygonParams],
            })
            .then(() => {
              console.log("Polygon added to MetaMask successfully!");
              resolve(true);
            })
            .catch((error: any) => {
              console.error("Error adding Polygon Mainnet to MetaMask:", error);
              reject(error);
            });
        } else {
          resolve(err);
        }
      }
    });
  };

  const addToken = async () => {
    try {
      const provider: any = await detectEthereumProvider();
      if (!provider) {
        toaster.error("Please install MetaMask to proceed!");
        return;
      }

      const ethereumProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethereumProvider.getSigner();

      await approveNetwork();
      await ethereumProvider.send("eth_requestAccounts", []);

      // Request to watch the asset
      await provider.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: props?.smartAddress,
            symbol: TOKEN_SYMBOL,
            decimals: TOKEN_DECIMAL,
          },
        },
      });
    } catch (error: any) {
      toaster.error("Unable to add the token!");
      console.error("Error adding token:", error);
    }
  };

  return (
    <button onClick={addToken} type="button" className="import_token">
      Import {TOKEN_SYMBOL}
    </button>
  );
};

export default ConnectWallet;
