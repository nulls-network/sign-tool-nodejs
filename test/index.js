const { doSign } = require('../app/sign.js')


async function test() {
    /**
     * test order info data
     * please pay attention to the parameters order
     */
    const info = [
        '20220418104946',
        'tron',
        'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
        '1.8',
        'localhost'
    ]
    const privateKey = 'f78494eb224f875d7e352a2b017304e11e6a3ce94af57b373ae82a73b3496cdd'

    const result = await doSign(info, privateKey)
    console.log('签名结果：', result)
}

test()