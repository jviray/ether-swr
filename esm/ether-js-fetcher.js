import { Provider as EthCallProvider } from 'ethcall';
import { call, multiCall } from './utils';
export const etherJsFetcher = (provider, ABIs) => {
    //TODO LS what happens when the network id change?
    const ethCallProvider = new EthCallProvider();
    return async (...args) => {
        let parsed;
        try {
            parsed = JSON.parse(args[0]);
        }
        catch (e) {
            // fallback silently
        }
        const [arg1] = parsed || args;
        // it's a batch call
        if (Array.isArray(arg1)) {
            // TODO LS can we skip this for every call?
            // yes, perhaps in the future https://github.com/Destiner/ethcall/issues/17
            await ethCallProvider.init(provider);
            const multi = parsed.reduce((memo, key) => {
                const [call, block] = multiCall(key, ethCallProvider, ABIs);
                if (memo.block && block !== memo.block) {
                    throw new Error(`${key} has block ${block} instead of ${memo.block}`);
                }
                memo.calls.push(call);
                return {
                    calls: memo.calls,
                    block
                };
            }, { calls: [], block: undefined });
            return ethCallProvider.all(multi.calls, multi.block);
        }
        return call(args, provider, ABIs);
    };
};
export default etherJsFetcher;
