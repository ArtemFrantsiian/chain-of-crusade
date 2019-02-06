import { BigNumber, RPCSubprovider, Web3ProviderEngine } from '0x.js';
import { DummyERC721TokenContract } from '@0x/abi-gen-wrappers';
import { getContractAddressesForNetworkOrThrow } from '@0x/contract-addresses';
import { DummyERC721Token } from '@0x/contract-artifacts';
import { MnemonicWalletSubprovider } from '@0x/subproviders';

export const GANACHE_NETWORK_ID = 50;

export const TX_DEFAULTS = { gas: 400000 };
export const MNEMONIC = 'concert load couple harbor equip island argue ramp clarify fence smart topic';
export const BASE_DERIVATION_PATH = `44'/60'/0'/0`;
export const GANACHE_CONFIGS = {
    rpcUrl: 'http://127.0.0.1:8545',
    networkId: GANACHE_NETWORK_ID,
};

export const NETWORK_CONFIGS = GANACHE_CONFIGS; // or KOVAN_CONFIGS or ROPSTEN_CONFIGS or RINKEBY_CONFIGS

// tslint:disable-next-line:custom-no-magic-numbers
export const ONE_SECOND_MS = 1000;
// tslint:disable-next-line:custom-no-magic-numbers
export const ONE_MINUTE_MS = ONE_SECOND_MS * 60;
// tslint:disable-next-line:custom-no-magic-numbers
export const TEN_MINUTES_MS = ONE_MINUTE_MS * 10;
// tslint:disable-next-line:custom-no-magic-numbers
export const UNLIMITED_ALLOWANCE_IN_BASE_UNITS = new BigNumber(2).pow(256).minus(1);
// tslint:disable-next-line:custom-no-magic-numbers
export const DECIMALS = 18;
export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
export const ZERO = new BigNumber(0);

export const mnemonicWallet = new MnemonicWalletSubprovider({
    mnemonic: MNEMONIC,
    baseDerivationPath: BASE_DERIVATION_PATH,
});

export const providerEngine = new Web3ProviderEngine();
providerEngine.addProvider(mnemonicWallet);
providerEngine.addProvider(new RPCSubprovider(NETWORK_CONFIGS.rpcUrl));
providerEngine.start();

const ERC721_TOKENS_BY_NETWORK_ID: { [networkId: number]: string[] } = {
    [GANACHE_NETWORK_ID]: ['0x07f96aa816c1f244cbc6ef114bb2b023ba54a2eb'],
};

export const dummyERC721TokenContracts: DummyERC721TokenContract[] = [];

for (const tokenAddress of ERC721_TOKENS_BY_NETWORK_ID[NETWORK_CONFIGS.networkId]) {
    dummyERC721TokenContracts.push(
        new DummyERC721TokenContract((DummyERC721Token as any).compilerOutput.abi, tokenAddress, providerEngine),
    );
}

export const contractAddresses = getContractAddressesForNetworkOrThrow(NETWORK_CONFIGS.networkId);
