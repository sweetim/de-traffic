async function main() {
    const Traffic = await ethers.getContractFactory("DeTraffic");

    // Start deployment, returning a promise that resolves to a contract object
    const traffic = await Traffic.deploy("Hello World!");
    console.log("Contract deployed to address:", traffic);
 }

 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });
