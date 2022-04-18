const { doSign, toBytes, doRecover } = require('../app/index.js')


async function test() {

    const info = [
        '20220418104946',//订单号
        'tron',//固定参数
        'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',//波场 USDT 合约
        '1.8',//金额
        'localhost'//通知URL
    ]
    const privateKey = 'f78494eb224f875d7e352a2b017304e11e6a3ce94af57b373ae82a73b3496cdd'

    const result = await doSign(info, privateKey)
    console.log('签名结果：', result)


    /**
     * 签名反解，得出公钥
     */
    const bytesData = toBytes(...info)
    const pubkey = doRecover(bytesData, result)
    console.log("反解出签名者的公钥：" + pubkey)
}

test()