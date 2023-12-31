import { CONTRACT_ADDRESS, CONTRACT_ABI as abiList } from "@verida/vda-common";

import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from 'ethers';
  
/**
 * Call lookUp() function of DIDRegistry contract
 * @param didAddress DID address to lookup
 * @param rpcUrl URL
 */
export async function lookup(didAddress: string, network: string, rpcUrl: string) : Promise<string[]> {
    // Simple read-only of the blockchain

    const contractABI = abiList["VeridaDIDRegistry"];
    const provider = new JsonRpcProvider(rpcUrl);
    const address = CONTRACT_ADDRESS["VeridaDIDRegistry"][network];

    if (!address) {
        throw new Error(`Empty contract address for network-${network}`)
    }

    const contract = new Contract(address, contractABI.abi, provider);
    
    let data = [];
    try {
        data = await contract.callStatic.lookup(didAddress);
    } catch (e: any) {
        throw new Error('DID not found');
    }

    return data[1]
}