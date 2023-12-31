// import * as fs from 'fs';
export type CONTRACT_NAMES = 
    "VeridaDIDRegistry"     |
    "NameRegistry"          |
    "SoulboundNFT"          |

    "VeridaDIDLinkage"      |
    "VeridaToken"           |
    "VDARewardContract";


export interface CONTRACT_INFO {
    abi: any,
    address: string
}

export const CONTRACT_ADDRESS : Record<CONTRACT_NAMES, Record<string, string | null>> = {
    "VeridaDIDRegistry": {
        mainnet: null,
        "0x89": null,
        testnet: "0x08CB4462958e6462Cc899862393f0b3bB6664efD",
        "0x13881": "0x08CB4462958e6462Cc899862393f0b3bB6664efD",
        devnet: "0x08CB4462958e6462Cc899862393f0b3bB6664efD",
    },
    "NameRegistry": {
        mainnet: null,
        "0x89": null,
        testnet: "0x1dD6AAc1858100091BEbb867C7628DA639F7C16E",
        "0x13881": "0x1dD6AAc1858100091BEbb867C7628DA639F7C16E",
        devnet: "0x1dD6AAc1858100091BEbb867C7628DA639F7C16E",
    },
    "SoulboundNFT" : {
        mainnet: null,
        "0x89": null,
        testnet: "0x7bf539E81e8beE06e3408359aC0867eD9C3bbD52",
        "0x13881": "0x7bf539E81e8beE06e3408359aC0867eD9C3bbD52",
        devnet: "0x7bf539E81e8beE06e3408359aC0867eD9C3bbD52",
    },

    "VeridaDIDLinkage" : {
        mainnet: null,
        "0x89": null,
        testnet: "0xF394a23dc6777cAB3067566F27Ec5bdDD2D0bD2A",
        "0x13881": "0xF394a23dc6777cAB3067566F27Ec5bdDD2D0bD2A",
        devnet: "0xF394a23dc6777cAB3067566F27Ec5bdDD2D0bD2A",
    },
    "VeridaToken" : {
        mainnet: null,
        "0x89": null,
        testnet: "0x745Db51351015d61573db37bC16C49B8506B93c8",
        "0x13881": "0x745Db51351015d61573db37bC16C49B8506B93c8",
        devnet: "0x745Db51351015d61573db37bC16C49B8506B93c8",
    },
    "VDARewardContract": {
        mainnet: null,
        "0x89": null,
        testnet: "0x5044bba95ad5a526c83086966B00F5ebB47A6673",
        "0x13881": "0x5044bba95ad5a526c83086966B00F5ebB47A6673",
        devnet: "0x5044bba95ad5a526c83086966B00F5ebB47A6673",
    }
};

export const CONTRACT_ABI : Record<CONTRACT_NAMES, any> = {
    "VeridaDIDRegistry": require('./abi/VeridaDIDRegistry.json'),
    "NameRegistry": require('./abi/NameRegistry.json'),
    "SoulboundNFT": require('./abi/SoulboundNFT.json'),

    "VeridaDIDLinkage": require('./abi/VeridaDIDLinkage.json'),
    "VeridaToken": require('./abi/VeridaToken.json'),
    "VDARewardContract": require('./abi/VDARewardContract.json')
}

export function getContractInfoForNetwork(name: CONTRACT_NAMES, chainNameOrId: string) : CONTRACT_INFO {
    // const abiPath = `../abi/${name}.json`;
    // console.log("File : ", abiPath)
    // if (!fs.existsSync(abiPath)) {
    //     throw new Error("Contract ABI file not exist")
    // }
    // const abi = require(abiPath);

    const abi = CONTRACT_ABI[name];
    if (!abi) {
        throw new Error("Contract ABI not exist")
    }

    const address = CONTRACT_ADDRESS[name][chainNameOrId];

    if (!address) {
        throw new Error("Contract address not defined");
    }

    return {
        abi: abi,
        address: <string>address
    }
}