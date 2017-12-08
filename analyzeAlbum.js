const http = require('http');

//解析相册，以相册名创建文件夹，获取每个相册的图片信息
async function analyzeAlbum(url) {

    //解析作品网址，获取图片地址信息
    await http.get(url, function(sres) {
        // res.setEncoding('utf8');
        let content = '';
        sres.on('data', function(chunk) {
            content += chunk;
        });

        sres.on('end', function() {
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
                return imgUrls;
            }

        });
    })
}

module.exports = analyzeAlbum;
