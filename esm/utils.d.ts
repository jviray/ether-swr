import { Contract, ContractInterface } from 'ethers'
import { Provider, Web3Provider } from '@ethersproject/providers'
import { Call, Provider as EthCallProvider } from 'ethcall'
export declare const contracts: Map<string, Contract>
export declare function getContract(
  address: string,
  abi: ContractInterface
): Contract
export declare const call: (
  parameters: string[],
  provider: Provider | Web3Provider,
  ABIs: any
) => Promise<any>
export declare const multiCall: (
  parameters: string | any[],
  provider: EthCallProvider,
  ABIs: any
) => [Call, number?]
