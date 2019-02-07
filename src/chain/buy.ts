import {
    assetDataUtils,
    BigNumber,
    ContractWrappers,
    generatePseudoRandomSalt,
    Order,
    orderHashUtils,
    signatureUtils,
} from '0x.js';
import { Web3Wrapper } from '@0x/web3-wrapper';

import {
    NETWORK_CONFIGS,
    TX_DEFAULTS,
    DECIMALS,
    NULL_ADDRESS,
    ZERO,
    ONE_SECOND_MS,
    TEN_MINUTES_MS,
    contractAddresses,
    dummyERC721TokenContracts,
    providerEngine,
} from './configs';

export const getRandomFutureDateInSeconds = (): BigNumber => {
    return new BigNumber(Date.now() + TEN_MINUTES_MS).idiv(ONE_SECOND_MS);
};

let receipt: any;
/**
 * In this scenario, the maker creates and signs an order for selling an ERC721 token for WETH.
 * The taker fills it via the 0x Exchange contract.
 */
export async function buyCard(cardErc721Id: BigNumber): Promise<void> {
    try {
        const contractWrappers = new ContractWrappers(providerEngine, {networkId: NETWORK_CONFIGS.networkId});
        const {etherToken: etherTokenAddress} = contractAddresses;
        const dummyERC721TokenContract = dummyERC721TokenContracts[0];
        if (!dummyERC721TokenContract) {
            console.log('No Dummy ERC721 Tokens deployed on this network');
            return;
        }
        // Initialize the Web3Wrapper, this provides helper functions around fetching
        // account information, balances, general contract logs
        const web3Wrapper = new Web3Wrapper(providerEngine);

        // the amount the maker is selling of maker asset (1 ERC721 Token)
        const makerAssetAmount = new BigNumber(1);
        // the amount the maker wants of taker asset
        const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(1), DECIMALS);

        const [maker, taker] = await web3Wrapper.getAvailableAddressesAsync();
        // 0x v2 uses hex encoded asset data strings to encode all the information needed to identify an asset
        const makerAssetData = assetDataUtils.encodeERC721AssetData(dummyERC721TokenContract.address, cardErc721Id);
        const takerAssetData = assetDataUtils.encodeERC20AssetData(etherTokenAddress);

        const mintTxHash = await dummyERC721TokenContract.mint.sendTransactionAsync(maker, cardErc721Id, {from: maker});
        receipt = await web3Wrapper.awaitTransactionMinedAsync(mintTxHash);
        console.log("receipt:", receipt);

        // Allow the 0x ERC721 Proxy to move ERC721 tokens on behalf of maker
        const makerERC721ApprovalTxHash = await contractWrappers.erc721Token.setProxyApprovalForAllAsync(
            dummyERC721TokenContract.address,
            maker,
            true,
        );
        console.log('allow maker', makerERC721ApprovalTxHash);
        receipt = await web3Wrapper.awaitTransactionMinedAsync(makerERC721ApprovalTxHash);
        console.log("receipt:", receipt);

        // Allow the 0x ERC20 Proxy to move WETH on behalf of takerAccount
        const takerWETHApprovalTxHash = await contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(
            etherTokenAddress,
            taker,
        );
        console.log("allow taker", takerWETHApprovalTxHash);
        receipt = await web3Wrapper.awaitTransactionMinedAsync(takerWETHApprovalTxHash);
        console.log("receipt:", receipt);

        const takerWETHDepositTxHash = await contractWrappers.etherToken.depositAsync(
            etherTokenAddress,
            takerAssetAmount,
            taker,
        );
        console.log("deposit taker", takerWETHDepositTxHash);
        receipt = await web3Wrapper.awaitTransactionMinedAsync(takerWETHDepositTxHash);
        console.log("receipt:", receipt);
        // Set up the Order and fill it
        const randomExpiration = getRandomFutureDateInSeconds();
        const exchangeAddress = contractAddresses.exchange;

        // Create the order
        const order: Order = {
            exchangeAddress,
            makerAddress: maker,
            takerAddress: NULL_ADDRESS,
            senderAddress: NULL_ADDRESS,
            feeRecipientAddress: NULL_ADDRESS,
            expirationTimeSeconds: randomExpiration,
            salt: generatePseudoRandomSalt(),
            makerAssetAmount,
            takerAssetAmount,
            makerAssetData,
            takerAssetData,
            makerFee: ZERO,
            takerFee: ZERO,
        };

        const oldOwner = await contractWrappers.erc721Token.getOwnerOfAsync(dummyERC721TokenContract.address, cardErc721Id);
        console.log("old owner", oldOwner);

        // Generate the order hash and sign it
        const orderHashHex = orderHashUtils.getOrderHashHex(order);
        const signature = await signatureUtils.ecSignHashAsync(providerEngine, orderHashHex, maker);
        const signedOrder = {...order, signature};
        // Fill the Order via 0x.js Exchange contract
        const txHashFill = await contractWrappers.exchange.fillOrderAsync(signedOrder, takerAssetAmount, taker, {
            gasLimit: TX_DEFAULTS.gas,
        });
        console.log("filling order", txHashFill);

        receipt = await web3Wrapper.awaitTransactionMinedAsync(txHashFill);
        console.log("receipt:", receipt);

        const newOwner = await contractWrappers.erc721Token.getOwnerOfAsync(dummyERC721TokenContract.address, cardErc721Id);
        console.log("new owner", newOwner);
    } catch (e) {
        throw new Error(e.message);
    }
}

