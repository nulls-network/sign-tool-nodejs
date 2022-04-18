const { concat, keccak256, toUtf8Bytes, SigningKey, joinSignature } = require("ethers").utils


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

module.exports = {
  doSign
}