import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/679049d887954c7a8abf638550e5029e"));

const privateKey = 'bb163bf7616a0f878389f3c50f00cea8ab01b2f8687f216db246a6f4457d88a1';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

export const transfer = async(req,res) => {
    try {
        const { receiverAddress, amountInEth } = req.body;
        const txCount = await web3.eth.getTransactionCount(account.address);
        const txObject = {
          nonce: web3.utils.toHex(txCount),
          to: receiverAddress,
          value: web3.utils.toHex(web3.utils.toWei(amountInEth.toString(), 'ether')),
          gasLimit: web3.utils.toHex(21000), // Standard gas limit for ether transfer
          gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
        };
    
        const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);
        console.log(" signedTx =>",signedTx);
  
      // Send the signed transaction
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log(" receipt =>",receipt);
      
      res.status(200).json({ message: 'successfully transfer ethers', txHash: receipt.transactionHash });
    
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    
}