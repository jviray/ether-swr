import { Cache, SWRConfiguration } from 'swr'
import { Wallet } from 'ethers'
import { Listener, Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { JsonRpcSigner } from '@ethersproject/providers'
export declare type Web3Provider = {
  getSigner: () => Signer
  on: (eventName: any, listener: Listener) => any
  removeAllListeners(eventName: any): any
}
export interface EthSWRConfigInterface<Data = any, Error = any>
  extends SWRConfiguration<Data, Error> {
  provider?: () => Cache
  ABIs?: Map<string, any>
  signer?: Wallet | JsonRpcSigner
  web3Provider?: Provider | Web3Provider | any
  subscribe?: any[] | any
}
