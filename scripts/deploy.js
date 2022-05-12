// This is a script for deploying your contracts. You can adapt it to deploy

const { ethers, artifacts } = require("hardhat");

// yours, or create new ones.
async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
      "gets automatically created and destroyed every time. Use the Hardhat" +
      " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Stock = await ethers.getContractFactory('Stock');
  const stock = await Stock.deploy();
  await stock.deployed();

  const Retailer = await ethers.getContractFactory('Retailer');
  const retailer = await Retailer.deploy(stock.address);
  await retailer.deployed();



  console.log("Retailer deployed at:", retailer.address);
  console.log("Stock deployed at:", stock.address);


  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles([stock, retailer]);
}

function saveFrontendFiles(contracts) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ Stock: contracts[0].address, Retailer: contracts[1].address }, undefined, 2)

  );

  const StockArtifact = artifacts.readArtifactSync("Stock");
  const RetailerArtifact = artifacts.readArtifactSync('Retailer');

  fs.writeFileSync(
    contractsDir + "/Retailer.json",
    JSON.stringify(RetailerArtifact, null, 2)
  );
  fs.writeFileSync(
    contractsDir + "/Stock.json",
    JSON.stringify(StockArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
