let everyDayDao = require('../dao/EveryDayDao.js');
let timeUtil = require('../utils/TimeUtil.js');
let respUtil = require('../utils/RespUtil.js');
let path = new Map();

function editEveryDay(req, res) {
    req.on('data', function (data) {
        everyDayDao.insertEveryDay(data.toString().trim(), timeUtil.getNow(), function (result) {
            res.writeHead(200);
            res.write(respUtil.writeResult('success', '添加成功', null));
            res.end();
        });
    })
}

path.set('/editEveryDay', editEveryDay);

function queryEveryDay(req, res) {
    everyDayDao.queryEveryDay(function (result) {
        res.writeHead(200);
        res.write(respUtil.writeResult('success', '添加成功', result));
        res.end();
    })
}

path.set('/queryEveryDay', queryEveryDay);

module.exports.path = path;