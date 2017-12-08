const http = require('http')
const fs = require('fs');
const mkdir = require('./mkdir')
const fetchAlbums = require('./fetchAlbums');
const analyzeAlbum = require('./analyzeAlbum');
const downImages = require('./imageUrls');

async function app() {
    let uid = '53393816';   //输入摄影师的用户id
    let baseUrl = 'http://my.poco.cn/act/act_list.php?user_id='+uid+'&p=';
    // let url = 'http://my.poco.cn/act/act_list.htx?user_id=55629005&p=2';
    
    let i,url,pageAlbums;
    let albums = [];
    
    for (i=1; i<=1; i++) {
        url = baseUrl + i;
        pageAlbums = await fetchAlbums(url);    //抓取每个分页里的相册集
        for (let album of pageAlbums){
            albums.push(album);
        }
    }
    return albums;
}

app().then(albums => {
    for(let album of albums){
        let path = mkdir(album.ablumName);
        let imageUrls = await analyzeAlbum(album.albumUrl);
        //循环下载图片保存到path路径，使用默认下载图片的文件名
        console.log(album.ablumName+'，图片数量：'+imageUrls.length);
        
        for (let imageUrl of imageUrls) {
            let imageName = imageUrl.slice(-23);
            //下载图片保存到path路径
            let images = await downImages(imageUrl,imageName,path);
        }
    }
})