// npx truffle migrate --reset --compile-all --network bscTestnet

const BavaToken = artifacts.require("BavaToken");
const BavaMasterFarmer = artifacts.require("BavaMasterFarmerV2");

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

module.exports = async function (deployer, network, accounts) {

  // Avalanche Fuji Testnet (blk number calculation based on 14sec per blk)

  const bavafarmstartblk = 4131493     //update start blk
  const avalancheblkperyear = 2246400  // 14 sec per block

  // Deploy BavaToken Fuji Testnet
  await deployer.deploy(BavaToken, bavafarmstartblk+avalancheblkperyear*2 , bavafarmstartblk+avalancheblkperyear*5, "0x355DFe12aF156Ba4C3B010AF973A43304Dd31f5D" , "100", "100", "3040639277")
  const bavaToken = await BavaToken.deployed()

  await deployer.deploy(BavaMasterFarmer, bavaToken.address, "0x7bC1Eb6Ed4d3aB3BEd5EE8b7EeD01dB0714A1Bb1","0x355DFe12aF156Ba4C3B010AF973A43304Dd31f5D","0x9a6F4E35a8BF20F207EdAA0876D59e276EeedD3F","0x9D834dd94bEd11641d314f2bC7897E99Acd1768D" , "10","9990",["0","1","258","6172","18515","30858","86401","172801"],["257","6171","18514","30857","86400","172800"],["75","92","96","98","99","995","9975","9999"],["25","8","4","2","1","5","25","1"])   //avalanche mainnet
  const bavaMasterFarmer = await BavaMasterFarmer.deployed()
  await bavaMasterFarmer.rewardMulUpdate([4096, 4096, 3072, 3072, 2048, 2048, 2048, 2048, 1536, 1536, 1536, 1536, 1536, 1536, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 768, 768, 768, 768, 768, 768, 768, 768, 512, 512, 512, 512, 512, 512, 512, 512, 512, 512, 512, 512, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 32, 32, 32, 32, 32, 32, 32, 32, 16, 16, 16, 16, 16, 16, 16, 16, 8, 8, 8, 8, 4, 4, 2, 1, 1])
  await bavaMasterFarmer.initPool("11400000000000000", bavafarmstartblk ,"43200")    // 302400 for avalanche mainet(2sec/blk)
  console.log("bavafarm init")

  await bavaMasterFarmer.percentUpdate("95", "53165", "100", "345", "53165")   // _new, _newdev, _newft, _newadr, _newfounder
  console.log("bavafarm deployed")
  await bavaToken.addAuthorized(bavaMasterFarmer.address)
  console.log("add Farm Authorized")
  // await bavaToken.manualMint("0xe57a7F50De2A71d8805C93786046e1a6B69161F0", "200000000000000000000000000") //Airdrop 20%
  // console.log("manualMint1")
  // await bavaToken.manualMint("0xc6c266D553b018aa4CB001FA18Bd0eceff2B5AF9", "180440000000000000000000000") //Liquidity 18.044%
  // console.log("manualMint2")
  
  // add(uint256 _allocPoint, IERC20 _lpToken, IMiniChef _stakingPglContract, IJoeChef _stakingJoeContract, uint256 _restakingFarmID, uint256 _numberOfPair, bool _withUpdate)
  await bavaMasterFarmer.add(1000, "0x88D845D62f85b6227bEa6B37cc147449ac583846", "0xCe7c9a156a43DD13E5C82f9655D2b8D937F1C666", "0x0000000000000000000000000000000000000000", 0, 0, "0x57c2cC5A37B2A00Af6020168565B974694816B8A", "0x0000000000000000000000000000000000000000",false)
  console.log("add MiniChef Farm0")
  // await bavaMasterFarmer.add(1000, "0x430B6Fec06E83847aEB0D2E423f7a1E3B5C9811D", "0xCe7c9a156a43DD13E5C82f9655D2b8D937F1C666", "0x0000000000000000000000000000000000000000", 1, 0, "0x57c2cC5A37B2A00Af6020168565B974694816B8A", "0x0000000000000000000000000000000000000000",false)
  // console.log("add MiniChef Farm1")
  // await bavaMasterFarmer.add(1000, "0xF889D569B631Fd079B0763172512F6a59c57cb38", "0xCe7c9a156a43DD13E5C82f9655D2b8D937F1C666", "0x0000000000000000000000000000000000000000", 2, 0, "0x57c2cC5A37B2A00Af6020168565B974694816B8A", "0x0000000000000000000000000000000000000000", false)
  // console.log("add MiniChef Farm2")
  await bavaMasterFarmer.add(1000, "0x57c2cC5A37B2A00Af6020168565B974694816B8A", "0xe3c70d9127F4914Eb06130Ef4A1e092F3C6c7AcD", "0x0000000000000000000000000000000000000000", 0, 1, "0x57c2cC5A37B2A00Af6020168565B974694816B8A", "0x0000000000000000000000000000000000000000", false)
  console.log("add stakingReward Farm")
  await bavaMasterFarmer.add(1000, "0x4C5c3189303e59FF9F727386418443F129E2f801", "0x0000000000000000000000000000000000000000", "0x695E85Dc33410DBea646217AEA138924FBDF81f5", 0, 0, "0x4D6acD96DCB80703680A4F1c1D5498C6E383Db06", "0x0000000000000000000000000000000000000000",false)
  console.log("add MasterChefJoe Farm0")
  // await bavaMasterFarmer.add(1000, "0x1A1a2057105C41103714288287C1a364F0454FFA", "0x0000000000000000000000000000000000000000", "0x695E85Dc33410DBea646217AEA138924FBDF81f5", 1, 0, "0x4D6acD96DCB80703680A4F1c1D5498C6E383Db06", "0x0000000000000000000000000000000000000000", false)
  // console.log("add MasterChefJoe Farm1")
  await bavaMasterFarmer.add(1000, "0xd51d2670Ff2065796893987a16a38aD2BC1b0A8d", "0x0000000000000000000000000000000000000000", "0x695E85Dc33410DBea646217AEA138924FBDF81f5", 2, 1, "0x4D6acD96DCB80703680A4F1c1D5498C6E383Db06", "0x0000000000000000000000000000000000000000", false)
  console.log("add MasterChefJoe XJoe")


  // ***************************************************************************************************************************************************************

  // // Avalanche Mainnet (blk number calculation based on 2sec per blk)

  // const bavafarmstartblk = 8797151   //update start blk
  // const avalancheblkperyear = 15724800  // 2sec per block 8813129

  // //Deploy BavaToken Mainnet
  // await deployer.deploy(BavaToken, bavafarmstartblk+avalancheblkperyear*2 , bavafarmstartblk+avalancheblkperyear*5,  "" , "100", "100", "3040639277")
  // const bavaToken = await BavaToken.deployed()

  // await deployer.deploy(BavaMasterFarmer, bavaToken.address,"0x7bC1Eb6Ed4d3aB3BEd5EE8b7EeD01dB0714A1Bb1","0x355DFe12aF156Ba4C3B010AF973A43304Dd31f5D","0x9a6F4E35a8BF20F207EdAA0876D59e276EeedD3F","0x9D834dd94bEd11641d314f2bC7897E99Acd1768D" , "10",["0","1","1801","43201","129601","216001","604801","1209601"],["1800","43200","129600","216000","604800","1209600"],["75","92","96","98","99","995","9975","9999"])   //avalanche mainnet
  // const bavaMasterFarmer = await BavaMasterFarmer.deployed()
  // await bavaMasterFarmer.rewardMulUpdate([4096, 4096, 3072, 3072, 2048, 2048, 2048, 2048, 1536, 1536, 1536, 1536, 1536, 1536, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 768, 768, 768, 768, 768, 768, 768, 768, 512, 512, 512, 512, 512, 512, 512, 512, 512, 512, 512, 512, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 32, 32, 32, 32, 32, 32, 32, 32, 16, 16, 16, 16, 16, 16, 16, 16, 8, 8, 8, 8, 4, 4, 2, 1, 1])
  // await bavaMasterFarmer.initPool("11400000000000000", bavafarmstartblk ,"302400")    // 302400 for avalanche mainet(2sec/blk)
  // console.log("bavafarm init") 
  
  // // ****************************************************************************************************************
  // await bavaMasterFarmer.percentUpdate("95", "53165", "100", "345", "53165")   // _new, _newdev, _newft, _newadr, _newfounder
  // console.log("bavafarm deployed")
  // await bavaToken.addAuthorized(bavaMasterFarmer.address)
  // console.log("add Farm Authorized")
  // await bavaToken.manualMint("0xe57a7F50De2A71d8805C93786046e1a6B69161F0", "200000000000000000000000000") //Airdrop 20%
  // console.log("manualMint1")
  // await bavaToken.manualMint("0xc6c266D553b018aa4CB001FA18Bd0eceff2B5AF9", "180440000000000000000000000") //Liquidity 18.044%
  // console.log("manualMint2")
  
  // add(_allocPoint, _lpToken, _stakingPglContract, _stakingJoeContract, _joeChefContract, _restakingFarmID, _numberOfPair, _reward, _reward1, _withUpdate)
  await bavaMasterFarmer.add("1000", "0x7c05d54fc5CB6e4Ad87c6f5db3b807C94bB89c52", "0x1f806f7C8dED893fd3caE279191ad7Aa3798E928", "0x0000000000000000000000000000000000000000", "8", "0", "0x60781C2586D68229fde47564546784ab3fACA982", "0x0000000000000000000000000000000000000000", "false")
  console.log("add MiniChef AVAX-WETH.e") //done
  await bavaMasterFarmer.add("1000", "0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367", "0x1f806f7C8dED893fd3caE279191ad7Aa3798E928", "0x0000000000000000000000000000000000000000", "0", "0", "0x60781C2586D68229fde47564546784ab3fACA982", "0x0000000000000000000000000000000000000000", "false")
  console.log("add MiniChef AVAX-PNG")  // done
  await bavaMasterFarmer.add("1000", "0xe28984e1EE8D431346D32BeC9Ec800Efb643eef4", "0x1f806f7C8dED893fd3caE279191ad7Aa3798E928", "0x0000000000000000000000000000000000000000", "7", "0", "0x60781C2586D68229fde47564546784ab3fACA982", "0x0000000000000000000000000000000000000000", "false")
  console.log("add MiniChef AVAX-USDT.e")
  await bavaMasterFarmer.add("1000", "0x60781C2586D68229fde47564546784ab3fACA982", "0x88afdaE1a9F58Da3E68584421937E5F564A0135b", "0x0000000000000000000000000000000000000000", "0", "1", "0x60781C2586D68229fde47564546784ab3fACA982", "0x0000000000000000000000000000000000000000", "false")
  console.log("add stakingReward PNG")
  await bavaMasterFarmer.add("1000", "0xbd918Ed441767fe7924e99F6a0E0B568ac1970D9", "0x1f806f7C8dED893fd3caE279191ad7Aa3798E928", "0x0000000000000000000000000000000000000000", "9", "0", "0x60781C2586D68229fde47564546784ab3fACA982", "0x0000000000000000000000000000000000000000", "false")
  console.log("add MiniChef AVAX-USDC.e")
  await bavaMasterFarmer.add("1000", "0xc13E562d92F7527c4389Cd29C67DaBb0667863eA", "0x1f806f7C8dED893fd3caE279191ad7Aa3798E928", "0x0000000000000000000000000000000000000000", "2", "0", "0x60781C2586D68229fde47564546784ab3fACA982", "0x0000000000000000000000000000000000000000", "false")
  console.log("add MiniChef USDC.e-USDT.e") // done
  // await bavaMasterFarmer.add(1000, "", "0x1f806f7C8dED893fd3caE279191ad7Aa3798E928", "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", 9, 0, "0x60781C2586D68229fde47564546784ab3fACA982", "0x0000000000000000000000000000000000000000", "false")
  // console.log("add MiniChef BAVA-WETH.e")



  // await bavaMasterFarmer.add(1000, "0xFE15c2695F1F920da45C30AAE47d11dE51007AF9", "0x0000000000000000000000000000000000000000", "0xd6a4F121CA35509aF06A0Be99093d08462f53052", 26, 0, "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd", "0x0000000000000000000000000000000000000000","false")
  // console.log("add MasterChefJoe WETH.e-AVAX")  // done
  await bavaMasterFarmer.add(1000, "0xA389f9430876455C36478DeEa9769B7Ca4E3DDB1", "0x0000000000000000000000000000000000000000", "0xd6a4F121CA35509aF06A0Be99093d08462f53052", "39", "0", "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd", "0x0000000000000000000000000000000000000000", "false")
  console.log("add MasterChefJoe USDC.e-AVAX")
  // await bavaMasterFarmer.add(1000, "0x57319d41F71E81F3c65F2a47CA4e001EbAFd4F33", "0x0000000000000000000000000000000000000000", "0xd6a4F121CA35509aF06A0Be99093d08462f53052", 24, 1, "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd", "0x0000000000000000000000000000000000000000", "false")
  // console.log("add MasterChefJoe XJoe")  // done
  await bavaMasterFarmer.add(1000, "0xeD8CBD9F0cE3C6986b22002F03c6475CEb7a6256", "0x0000000000000000000000000000000000000000", "0xd6a4F121CA35509aF06A0Be99093d08462f53052", "28", "0", "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd", "0x0000000000000000000000000000000000000000", "false")
  console.log("add MasterChefJoe AVAX-USDT.e")
  // await bavaMasterFarmer.add(1000, "0x454E67025631C065d3cFAD6d71E6892f74487a15", "0x0000000000000000000000000000000000000000", "0x188bED1968b795d5c9022F6a0bb5931Ac4c18F00", 0, 0, "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd", "0x0000000000000000000000000000000000000000", "false")
  // console.log("add MasterChefJoe AVAX-JOE")  // skip
  await bavaMasterFarmer.add(1000, "0x1643de2efb8e35374d796297a9f95f64c082a8ce", "0x0000000000000000000000000000000000000000", "0xd6a4F121CA35509aF06A0Be99093d08462f53052", "30", "0", "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd", "0x0000000000000000000000000000000000000000", "false")
  console.log("add MasterChefJoe USDC.e-USDT.e")
  // await bavaMasterFarmer.add(1000, "", "0x0000000000000000000000000000000000000000", "0x57319d41F71E81F3c65F2a47CA4e001EbAFd4F33", "0xd6a4F121CA35509aF06A0Be99093d08462f53052", 24, 1, "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd", "0x0000000000000000000000000000000000000000", "false")
  // console.log("add MasterChefJoe BAVA-WETH")  // skip

};
