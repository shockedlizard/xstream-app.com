
const { Web3 } = require('web3');
const BSC_PUBLICNODE = process.env.BSC_PUBLICNODE;


import CryptoJS from 'crypto-js';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'xK9#mP2$vL5@nQ8&jR4*hT7!wY3^zM6';


export function encrypt(text: string): string {
    try {
        return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Encryption failed');
    }
}

export function decrypt(encryptedText: string): string {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Decryption failed');
    }
}




export async function createEthAddress() {
    console.log(BSC_PUBLICNODE)
    try {
        const web3 = new Web3(BSC_PUBLICNODE);
        const wallet = web3.eth.accounts.create();
        return wallet;
    } catch (error) {
        console.error('Error creating Ethereum address:', error);
        return null;
    }
}

export const getBnbBalance = async (address: string) => {
    console.log(BSC_PUBLICNODE)
    try {
        const web3 = new Web3(BSC_PUBLICNODE);
        const balanceWei = await web3.eth.getBalance(address);
        const balanceBNB = web3.utils.fromWei(balanceWei, 'ether');
        return Number(parseFloat(balanceBNB).toFixed(4));
    } catch (error) {
        console.error('Error getting BNB balance:', error);
        return 0;
    }
}

export const getXtrBalance = async (address: string) => {
    try {
        const web3 = new Web3(BSC_PUBLICNODE);
        const tokenAbi = [
            {
                "constant": true,
                "inputs": [{ "name": "_owner", "type": "address" }],
                "name": "balanceOf",
                "outputs": [{ "name": "balance", "type": "uint256" }],
                "type": "function"
            }
        ];

        const tokenContract = new web3.eth.Contract(
            tokenAbi,
            process.env.TOKEN_ADDRESS
        );
        const balance = await tokenContract.methods
            .balanceOf(address)
            .call();
        // Konversi dari Wei ke Token (sesuaikan dengan decimals token)
        const tokenBalance = web3.utils.fromWei(balance, 'ether');
        return Number(parseFloat(tokenBalance).toFixed(4));
    } catch (error) {
        console.error('Error getting XTR balance:', error);
        return 0;
    }
}


export const xtrHistory = async (address: string) => {
    const bscscanApiKey = process.env.BSCSCAN_API_KEY;
    const bscscanUrl = process.env.BSCSCAN_URL;
    
    try {
        const response = await fetch(
            `${bscscanUrl}` +
            `?module=account` +
            `&action=tokentx` +
            `&contractaddress=${process.env.TOKEN_ADDRESS}` +
            `&address=${address}` +
            `&sort=desc` +
            `&apikey=${bscscanApiKey}`
        );
        
        const data = await response.json();
        if (data.status === '1' && data.result) {
            return data.result.map((tx: any) => ({
                transactionHash: tx.hash,
                from: tx.from,
                to: tx.to,
                value: Web3.utils.fromWei(tx.value, 'ether'),
                timestamp: tx.timeStamp,
                date: new Date(Number(tx.timeStamp) * 1000).toISOString(),
                blockNumber: Number(tx.blockNumber),
                type: tx.from.toLowerCase() === address.toLowerCase() ? 'send' : 'receive',
                status: tx.isError === "0" ? "success" : "failed",
                gas: Web3.utils.fromWei(tx.gasPrice, 'gwei')
            }));
        }
        return [];
    } catch (error) {
        console.error('Error getting transaction history:', error);
        return [];
    }
}
