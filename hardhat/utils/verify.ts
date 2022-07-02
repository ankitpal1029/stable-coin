import { run } from "hardhat";
import { Address } from "hardhat-deploy/dist/types";

const verify = async (contractAddress: Address, args: Array<string>) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
};
export { verify };
