import { Contract } from 'ethers';
import { isAddress } from '@ethersproject/address';
import { ABIError, ABINotFound } from './Errors';
import { Contract as EthCallContract } from 'ethcall';
const isObject = obj => {
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
};
const parseExtended = (params) => {
    const extended = isObject(params[params.length - 1])
        ? params[params.length - 1]
        : { blockTag: undefined };
    return extended;
};
const parseParams = params => {
    const [address, method, ...otherParams] = params;
    const extended = parseExtended(otherParams);
    if (Object.values(extended).filter(Boolean).length > 0) {
        // discard the last item because it was an extend object
        otherParams.pop();
    }
    return { params: [address, method, otherParams], extended };
};
export const contracts = new Map();
export function getContract(address, abi) {
    let contract = contracts.get(address);
    if (contract) {
        return contract;
    }
    contract = new Contract(address, abi);
    contracts.set(address, contract);
    return contract;
}
export const call = (parameters, provider, ABIs) => {
    const [address, method, ...otherParams] = parameters;
    // it's a contract
    if (isAddress(address)) {
        if (!ABIs)
            throw new ABIError(`ABI repo not found`);
        if (!ABIs.get)
            throw new ABIError(`ABI repo isn't a Map`);
        const abi = ABIs.get(address);
        if (!abi)
            throw new ABINotFound(`ABI not found for ${address}`);
        const contract = new Contract(address, abi, provider);
        return contract[method](...otherParams);
    }
    const param2 = method;
    const baseMethod = address; // getBalance, getTransactionCount, etc
    return provider[baseMethod](param2, ...otherParams);
};
export const multiCall = (parameters, provider, ABIs) => {
    const { params: [address, method, otherParams], extended } = parseParams(parameters);
    // it's a contract
    if (isAddress(address)) {
        if (!ABIs)
            throw new ABIError(`ABI repo not found`);
        if (!ABIs.get)
            throw new ABIError(`ABI repo isn't a Map`);
        const abi = ABIs.get(address);
        if (!abi)
            throw new ABINotFound(`ABI not found for ${address}`);
        const contract = new EthCallContract(address, abi);
        return [contract[method](...otherParams), extended.blockTag];
    }
    const param2 = method;
    const baseMethod = address === 'getBalance' ? 'getEthBalance' : address; // getBalance, getTransactionCount, etc
    return [provider[baseMethod](param2, ...otherParams), extended.blockTag];
};
