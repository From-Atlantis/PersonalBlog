const fs = require('fs');

let globalConfig = {};

let conf = fs.readFileSync(__dirname + '/server.conf');

let configArr = conf.toString().split('\n');

for (let i = 0; i < configArr.length; i++) {
    globalConfig[configArr[i].split('=')[0].trim()] = configArr[i].split('=')[1].trim();
}

module.exports = globalConfig;