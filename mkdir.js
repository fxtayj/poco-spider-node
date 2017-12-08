const fs = require('fs');

function mkdir(albumName) {
    albumName = albumName ? albumName : '未命名' + Math.random().toString(36).substring(7);
    if (fs.existsSync('./downImg/' + albumName)) {
        console.log("文件夹已存在，目录为：" + albumName);
    } else {
        //创建分类文件夹目录
        fs.mkdirSync('./downImg/' + albumName, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("目录创建成功。目录为：" + albumName);
        });
    }
    return './downImg/' + albumName;
}

module.exports = mkdir;