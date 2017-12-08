const http = require('http');
const fs = require('fs');
const downImages = require('./downImages');

//解析相册，以相册名创建文件夹，获取每个相册的图片信息
function analyzeAlbum(url, path) {
    url = url ? url : 'http://my.poco.cn/lastphoto_v2-htx-id-5999556-user_id-55629005-p-0.xhtml';
    path = path ? path : '未命名' + Math.random().toString(36).substring(7);

    if (fs.existsSync('./downImg/' + path)) {
        console.log("文件夹已存在，目录为：" + path);
    } else {
        //创建分类文件夹目录
        fs.mkdirSync('./downImg/' + path, function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("目录创建成功。目录为：" + path);
        });
    }

    //解析作品网址，获取图片地址信息
    http.get(url, function(sres) {
        // res.setEncoding('utf8');
        let content = '';
        sres.on('data', function(chunk) {
            content += chunk;
        });

        sres.on('end', function() {
            let re = /originPhoto:'(http:\/\/.*?jpg)/g;
            let imgInfo = [];
            while (true) {
                let match = re.exec(content);
                if (!match) break;
                let imgUrl = match[1];
                if (imgUrl.indexOf('gif') > 0) {
                    continue;
                }
                let imgName = imgUrl.slice(-23);
                imgInfo.push({
                    imgName: imgName,
                    imgUrl: imgUrl.trim()
                })
            }

            //循环下载图片保存到path路径，使用默认下载图片的文件名
            console.log('图片数量：'+imgInfo.length);
            for (let img of imgInfo) {
                //下载图片保存到path路径
                downImages(img.imgUrl,img.imgName,path);
            }

        });
    })
}

module.exports = analyzeAlbum;
