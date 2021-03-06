const http = require('http');
const fs = require('fs');

function downloadImages(url, fileName, path) {

    http.get(url, function (res) {
        let imgData = '';
        res.setEncoding('binary'); //一定要设置response的编码为binary否则会下载下来的图片打不开
        res.on('data', function (chunk) {
            imgData += chunk;
        });
        res.on('end', function () {
            fs.writeFile(path + '/' + fileName, imgData, 'binary', function (err) {
                if (err) {
                    console.log('保存失败');
                    console.log(err);
                } else {
                    console.log('保存成功，文件路径：' + path + '/' + fileName);
                }
            });

        });
        res.on('error', function (e) {
            console.log("Got error: " + e.message);
        })
    });
}

module.exports = downloadImages;