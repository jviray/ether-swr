import { SWRResponse } from 'swr'
import { EthSWRConfigInterface } from './types'
export declare type etherKeyFuncInterface = () =>
  | ethKeyInterface
  | ethKeysInterface
export declare type ethKeyInterface = [string, any?, any?, any?, any?]
export declare type ethKeysInterface = any[][]
declare function useEtherSWR<Data = any, Error = any>(
  key: ethKeyInterface | ethKeysInterface | etherKeyFuncInterface
): SWRResponse<Data, Error>
declare function useEtherSWR<Data = any, Error = any>(
  key: ethKeyInterface | ethKeysInterface | etherKeyFuncInterface,
  config?: EthSWRConfigInterface<Data, Error>
): SWRResponse<Data, Error>
declare function useEtherSWR<Data = any, Error = any>(
  key: ethKeyInterface | ethKeysInterface | etherKeyFuncInterface,
  fetcher?: any, //fetcherFn<Data>,
  config?: EthSWRConfigInterface<Data, Error>
): SWRResponse<Data, Error>
declare const EthSWRConfig: import('react').Provider<
  EthSWRConfigInterface<any, any>
>
declare const EtherSWRConfig: import('react').Provider<
  EthSWRConfigInterface<any, any>
>
export { EthSWRConfig, EtherSWRConfig }
export default useEtherSWR
