import { createContext, useState, useEffect } from 'react';
import { ethers } from "ethers";
import config from "../config.json";
import Marketplace from "../abis/Marketplace.json";
import NFT from "../abis/NFT.json";
import axios from 'axios';




export const ContractContext = createContext<any | null>(null);


const ContractProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState<any>({});
  const [marketplace, setMarketplace] = useState<any>({});
  const [items, setItems] = useState([]);

  const [provider, setProvider] = useState<any>()

  const loadBlockchainData = async () => {
    console.log("ws")
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider)
    // Set signer
    const signer = provider.getSigner();

    const network = await provider.getNetwork();

    let parsedConfig: any = config;
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(
      parsedConfig[network.chainId].marketplace.address,
      Marketplace,
      signer
    );
    setMarketplace(marketplace);
    const nft = new ethers.Contract(
      parsedConfig[network.chainId].nft.address,
      NFT,
      signer
    );


    setNFT(nft);

    console.log(marketplace, 'marketPlae')
    const itemCount = await marketplace.itemCount();
    console.log(itemCount)
    const items = [];
    for (let i = 0; i < itemCount; i++) {
      const item = await marketplace.items(i);
      if (!item.sold) {
        console.log(item.tokenId)
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        console.log(uri.split('/'))
        let base = 'https://ipfs.io/ipfs/'
        const response = await axios.get(base + uri.split('/')[4]);
        const metadata = await response.data
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
    }

    setItems(items as []);


    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts: any) {
      console.log(typeof accounts)
      setAccount(accounts[0]);
    });
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const value = {
    account,
    setAccount,
    nft,
    marketplace,
    provider,
    items
  }

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  )
}


export default ContractProvider