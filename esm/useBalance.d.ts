import { BigNumber } from 'ethers'
declare type Options = {
  block: string | number
}
export declare function useBalance(
  address: string,
  { block }?: Options
): import('swr').SWRResponse<any, any>
export declare function useBalances(
  addresses: string[],
  { block }?: Options
): import('swr').SWRResponse<BigNumber[], any>
export {}
