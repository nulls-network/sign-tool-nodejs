const { doSign } = require('../../app/index.js')


async function test() {
    /**
     * 使用生成订单，作生成签名测试
     * 请注意参数的顺序正确，不同的顺序会导致生成签名不一致
     */
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
}

test()