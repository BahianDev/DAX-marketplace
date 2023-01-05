import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Navbar } from "../components/Navbar";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { useContext, useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ContractContext } from "../contexts/contract";
import { ethers } from "ethers";

const projectId = "2DxpAMDUxnEwmX2dp5U3YrLjlRZ";
const projectSecret = "2a7dbfdfb1d708794a3b7a1c4bac0e4e";
const authorization =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const client = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});

export default function Create() {
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { marketplace, nft } = useContext(ContractContext);

  const uploadToIPFS = async (event: any) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const result = await client.add(file);
        console.log(result);
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };

  const createNFT = async () => {
    if (!image || !price || !name || !description) return;
    try {
      const result = await client.add(
        JSON.stringify({ image, price, name, description })
      );

      mintThenList(result);
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };
  const mintThenList = async (result: any) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
    // mint nft
    console.log(uri), 'aqui'
    await (await nft.mint(uri)).wait();
    // get tokenId of new nft
    const id = await nft.totalSupply();
    console.log(Number(id), 'supply')
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    await (await marketplace.makeItem(nft.address, 0, listingPrice)).wait();
  };
  return (
    <>
      <Flex w="100%" h="100vh" justifyContent="center">
        <FormControl>
          <Input type="file" onChange={uploadToIPFS} />

          <FormLabel>Name</FormLabel>
          <Input type="text" onChange={(e) => setName(e.target.value)} />
          <FormLabel>Description</FormLabel>
          <Input type="text" onChange={(e) => setDescription(e.target.value)} />
          <FormLabel>Price in ETH</FormLabel>
          <Input
            type="number"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Button mt={4} type="submit" onClick={() => createNFT()}>
            Create & List NFT!
          </Button>
        </FormControl>
      </Flex>
    </>
  );
}
