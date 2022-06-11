import { useState } from "react"

import { ethers } from "ethers"
import { Box, Button, Flex, Text, Input } from "@chakra-ui/react"

import gameNyxNFT from "./GameNyxNFT.json"

const gameNyxNFTAddress = "0x0747dB787BAe464f1FfDBA56475eEA06ee52C107"

export const MainMint = ({ accounts, setAccounts }) => {
  const [nftUri, setNftUri] = useState("")

  const isConnected = Boolean(accounts[0])

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        gameNyxNFTAddress,
        gameNyxNFT.abi,
        signer
      )

      try {
        const response = await contract.safeMint(accounts[0], nftUri, {
          value: ethers.utils.parseEther("0.001").toString(),
        })
        console.log("response: ", response)
      } catch (error) {
        console.log("Error: ", error)
      }
    }
  }

  return (
    <Flex
      justify={"center"}
      align="center"
      height={"100vh"}
      paddingBottom="150px"
    >
      <Box width={"520px"}>
        <Text fontSize={"48px"} textShadow="0 5px #000000">
          GameNyx NFT Portal
        </Text>
        {isConnected ? (
          <div>
            <div>
              <Flex justify={"center"} align="center">
                <Input
                  type={"text"}
                  variant="outline"
                  size="lg"
                  placeholder="Enter wallet address"
                  value={accounts}
                />
                <Input
                  type={"text"}
                  variant="outline"
                  size="lg"
                  placeholder="Enter NFT URI"
                  onChange={(e) => setNftUri(e.target.value)}
                />
                <Button
                  backgroundColor="blue"
                  borderRadius="5px"
                  boxShadow="0px 2px 2px 1px #0f0f0f"
                  color="white"
                  cursor="pointer"
                  fontFamily="inherit"
                  padding="15px"
                  margin="0 15px"
                  onClick={handleMint}
                >
                  Mint my NFT!
                </Button>
              </Flex>
            </div>
          </div>
        ) : (
          <Text fontSize={"24px"}>
            Connect your wallet in order to mint NFT
          </Text>
        )}
      </Box>
    </Flex>
  )
}
