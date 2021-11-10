import { Provider, Web3Provider } from '@ethersproject/providers'
export declare const etherJsFetcher: (
  provider: Provider | Web3Provider,
  ABIs?: Map<string, any>
) => (...args: any[]) => Promise<any>
export default etherJsFetcher
