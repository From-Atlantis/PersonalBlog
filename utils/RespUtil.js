// 用于处理返回的数据
function writeResult(status, msg, data) {
    return JSON.stringify({
        status: status,
        msg: status,
        data: data
    })
}

module.exports.writeResult = writeResult;