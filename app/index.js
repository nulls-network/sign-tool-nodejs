const { ethers, Contract, utils } = require("ethers")
const { concat, keccak256, toUtf8Bytes, SigningKey, joinSignature, splitSignature, recoverAddress } = utils

function toBytes(...params) {
  const v = []
  for (const p of params) {
    if (typeof (p) === 'string')
      v.push(toUtf8Bytes(p))

    else
      v.push(toUtf8Bytes(String(p)))
  }
  return keccak256(concat(v))
}


/**
    version = 1.0
*/

async function doSign(info = [], privateKey) {
  try {
    const bytesData = toBytes(
      ...info
    )

    const signer = new SigningKey(`0x${privateKey}`)

    const signature = signer.signDigest(bytesData)

    return joinSignature(signature)
  }
  catch (error) {
    console.log(error)
  }
}

/**
    version = 1.1
*/
async function doSignMessage(info = [], privateKey) {
  try {
    const bytesData = toBytes(
      ...info
    )

    const wallet = new ethers.Wallet(privateKey)

    const signature = await wallet.signMessage(bytesData);

    return signature
  }
  catch (error) {
    console.log(error)
  }
}

/**
    version = 1.0
*/
function doRecover(bytesData, signature) {
  try {
    const sig = splitSignature(signature)
    const recovered = recoverAddress(bytesData, sig)
    return recovered
  }
  catch (e) {
    return null
  }
}

/**
    version = 1.1
*/
async function doRecoverSignMessage(bytesData, signature) {
  try {
    const sig = utils.splitSignature(signature)
    let abi = [
        "function verifyString(string, uint8, bytes32, bytes32) public pure returns (address)"
    ];
    let provider = ethers.getDefaultProvider('ropsten');
    let contractAddress = '0x80F85dA065115F576F1fbe5E14285dA51ea39260';
    let contract = new Contract(contractAddress, abi, provider);
    const recovered = await contract.verifyString(bytesData, sig.v, sig.r, sig.s)
    return recovered
  }
  catch (e) {
    return null
  }
}



module.exports = {
  doSign,
  toBytes,
  doRecover,
  doSignMessage,
  doRecoverSignMessage
}