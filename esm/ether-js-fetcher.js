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
        if (Array.isArray(arg1)) {
            // it's a batch call
            // can we skip this for every call?
            await ethCallProvider.init(provider);
            const calls = parsed;
            return ethCallProvider.all(calls.map(call => multiCall(call, ethCallProvider, ABIs)));
        }
        return call(args, provider, ABIs);
    };
};
export default etherJsFetcher;
