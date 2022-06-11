import React from "react"

import { Box, Button, Flex, Image, Link, Spacer } from "@chakra-ui/react"
import Twitter from "./assets/social-media-icons/twitter_32x32.png"

export const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0])

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      setAccounts(accounts)
    }
  }

  return (
    <Flex justify="space-between" align="center" padding="30px">
      {/*** Social media icons */}{" "}
      <Flex justify="space-around" padding="0 75px" width="40%">
        <Link href="https://twitter.com/BlockShotsGame">
          <Image src={Twitter} boxSize="42px" margin="0 15px" />
        </Link>
      </Flex>
      {/*** Nav selections */}
      <Flex
        justify="space-around"
        align="center"
        width="40%"
        padding="30px 30px 30px 30px"
      ></Flex>
      <Box margin="0 15px">About</Box>
      <Spacer />
      {/*** Connect wallet button */}
      {isConnected ? (
        <Box margin="0 15px">Connected</Box>
      ) : (
        <Button
          backgroundColor="blue"
          borderRadius="5px"
          boxShadow="0px 2px 2px 1px #0f0f0f"
          color="white"
          cursor="pointer"
          fontFamily="inherit"
          padding="15px"
          margin="0 15px"
          onClick={connectAccount}
        >
          Connect wallet
        </Button>
      )}
    </Flex>
  )
}
