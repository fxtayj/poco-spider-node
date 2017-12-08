const http = require('http')
const fs = require('fs');
const mkdir = require('./mkdir')
const fetchAlbums = require('./fetchAlbums');
const analyzeAlbum = require('./analyzeAlbum');
const downImages = require('./downloadImages');

async function app() {
    let uid = '53393816'; //输入摄影师的用户id
    let baseUrl = 'http://my.poco.cn/act/act_list.php?user_id=' + uid + '&p=';
    // let url = 'http://my.poco.cn/act/act_list.htx?user_id=55629005&p=2';

    let i, url;
    let albums = [];

    for (i = 1; i <= 3; i++) {
        url = baseUrl + i;
        let pageAlbums = await fetchAlbums(url); //抓取每个分页里的相册集
        for (let album of pageAlbums) {
            albums.push(album);
        }
    }
    return albums;
}

app().then(async albums => {
    let imagesCount = 0;
    // TODO 存在ablums循环时只有部分数据的问题。
    for (let album of albums) {
        let path = mkdir(album.albumName);
        let imageUrls = await analyzeAlbum(album.albumUrl);
        //循环下载图片保存到path路径，使用默认下载图片的文件名
        // console.log(album.albumName + '，图片数量：' + imageUrls.length);
        imagesCount += imageUrls.length;
        for (let imageUrl of imageUrls) {
            let imageName = imageUrl.slice(-23);
            //查询文件是否以下载，避免重复下载，减少请求。
            if (fs.existsSync(path + '/' + imageName)) {
                // console.log("图片已存在，跳过下载");
            } else {
                //下载图片保存到path路径
                downImages(imageUrl, imageName, path);
            }
        }
    }
    console.log('本次下载图片总数为：' + imagesCount);
})