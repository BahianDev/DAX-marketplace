import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import { Navbar } from "../components/Navbar";
import {
  Box,
  Button,
  Flex,
  GridItem,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import config from "../config.json";

import Marketplace from "../abis/Marketplace.json";
import NFT from "../abis/NFT.json";
import { ContractContext } from "../contexts/contract";

export default function Home() {
  const { marketplace, nft, items } = useContext(ContractContext);

  const [loading, setLoading] = useState(true);

  const buyMarketItem = async (item: { itemId: any; totalPrice: any }) => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
  };

  return (
    <>
      <Flex w="100%" h="100vh" justifyContent="center">
        <Box w="70%">
          <SimpleGrid
            columns={[1, 2, 2, 3, 4]}
            spacing={10}
            gap={6}
            mt={100}
            w="100%"
            justifyItems="center"
          >
            {items.map((item: any, idx: number) => (
              <Flex key={idx} w="100%" h="330" border="0.5px solid #FFFFFF" direction='column'>
                <Image
                  src={"https://ipfs.io/ipfs/" + item.image.split("/")[4]}
                  width="100%"
                  height={240}
                />
                <Text>{item.name}</Text>

                <Button onClick={() => buyMarketItem(item)}>Buy</Button>
              </Flex>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </>
  );
}
