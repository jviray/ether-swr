import { BigNumber } from 'ethers'
export declare function useBalanceOf<T = BigNumber>(
  contractOrContracts: string | string[],
  ownerOrOwners: string | string[]
): import('swr').SWRResponse<T, any>
