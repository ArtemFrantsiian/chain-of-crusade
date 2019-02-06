import nem from 'nem-sdk';

const endpoint = nem.model.objects.create("endpoint");
//  Create an NIS endpoint object
const httpProvider = endpoint(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
// Create an NIS endpoint websocket
// Get an empty un-prepared transfer transaction object
const transferTransaction = nem.model.objects.get("transferTransaction");
// Get an empty common object to hold pass and key
const common = nem.model.objects.get("common");
// Set the private key in common object
common.privateKey = "f4c6b46f3ebef0c2d46b1fd1564e528b889900d35c56c155e344aa015d74950b";
// Address to subscribe
const addressFrom = "TAFNHOF54VTOJY3OM3BTDWZHDL6NJEBEX4XAV2DW";
const addressTo = "TD75D6U43FMCRV4I4V3PSMEZHJEBI7VK5TFULAHG";
const amount = 5;
// Create a connector object

/* const base64Decode = (str: string): string | void => {
    const corresponds = str.match(/.{1,2}/g);
    if (corresponds) {
        return corresponds.map((v) => String.fromCharCode(parseInt(v, 16))).join('')
    }
    return;
}; */

const create = async (fightHystory: any) => {
    // Create the apostille
    const content = JSON.stringify(fightHystory);
    const fileContent = nem.crypto.js.enc.Utf8.parse(content);
    const apostille = nem.model.apostille.create(
        common,
        "game_process.txt",
        fileContent,
        "Game process",
        nem.model.apostille.hashing.SHA256,
        false,
        "",
        true,
        nem.model.network.data.testnet.id
    );
    return await nem.model.transactions.send(common, apostille.transaction, httpProvider);
};

const connect = async (connector: any): Promise<void> => {
    try {
        await connector.connect();
        nem.com.websockets.subscribe.errors(connector, (err: any) => {
            console.log(JSON.stringify(err));
        });
        let i = 1;
        // Subscribe to confirmed transactions channel
        nem.com.websockets.subscribe.account.transactions.confirmed(connector, async (res: any) => {
            // JSON.stringify(res.transaction.recipient);
            // JSON.stringify(res.transaction.amount);
            // JSON.stringify(res.transaction.message.payload);
            // console.log('message :', base64Decode(res.transaction.message.payload));
            if (i === 1) {
                await send(res.meta.hash.data);
                i += 1;
            }
        });
        // Request account data
        nem.com.websockets.requests.account.data(connector);
        // Request recent transactions
        nem.com.websockets.requests.account.transactions.recent(connector);
    } catch (e) {
        console.log(JSON.stringify(e));
        // Try to reconnect
        await connect(connector);
    }
};

/**
 * Build transaction from form data and send
 */
const send = async (message?: string): Promise<any> => {
    // Set the cleaned amount into transfer transaction object
    transferTransaction.amount = amount;
    // Recipient address must be clean (no hypens: "-")
    transferTransaction.recipient = addressTo;
    // Set message
    transferTransaction.message = message || "";
    // Prepare the updated transfer transaction object
    const transactionEntity = nem.model.transactions.prepare("transferTransaction")(
        common,
        transferTransaction,
        nem.model.network.data.testnet.id
    );
    // Serialize transfer transaction and announce
    try {
        const res = await nem.model.transactions.send(common, transactionEntity, httpProvider);
        // If code >= 2, it's an error
        if (res.code >= 2) {
            console.log(res);
        } else {
            return {
                res,
                amount,
                addressFrom,
                addressTo,
            };
        }
    } catch (e) {
        console.log(e);
    }
};

export const createAndSendTransaction = async (fightHystory: any) => {
    const responseA = await create(fightHystory);
    return await send(responseA.transactionHash.data);
};
