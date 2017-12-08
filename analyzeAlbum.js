const http = require('http');

//解析相册，以相册名创建文件夹，获取每个相册的图片信息
function analyzeAlbum(url) {
    return new Promise((resolve, reject) => {
        try {
            //解析作品网址，获取图片地址信息
            http.get(url, function (res) {
                // res.setEncoding('utf8');
                let content = '';
                res.on('data', function (chunk) {
                    content += chunk;
                });

                res.on('end', function () {
                    let re = /originPhoto:'(http:\/\/.*?jpg)/g;
                    let imageUrls = [];
                    while (true) {
                        let match = re.exec(content);
                        if (!match) break;
                        let imageUrl = match[1];
                        if (imageUrl.indexOf('gif') > 0) {
                            continue;
                        }
                        imageUrls.push(imageUrl.trim())
                        resolve(imageUrls)
                    }

                });
                res.on('error', function(e) {
                    console.log("Got error: " + e.message);
                    reject(e);
                })
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = analyzeAlbum;