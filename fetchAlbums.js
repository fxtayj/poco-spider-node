const cheerio = require('cheerio');
const http = require('http')
const iconv = require('iconv-lite');

//解析作品集页面，获取作品页面信息
async function fetchAlbums(url) {
    try {
        await http.get(url, function (res) {
            var chunks = [];

            res.on('data', function (chunk) {
                chunks.push(chunk);
            });

            res.on('end', function () {
                let albums = [];
                let html = iconv.decode(Buffer.concat(chunks), 'gb2312');
                let $ = cheerio.load(html, {
                    decodeEntities: false
                });
                $('h2.title a').each(function (idx, element) {
                    var $element = $(element);
                    if (!$element.text() == '') {
                        albums.push({
                            albumName: $element.text(),
                            albumUrl: $element.attr('href')
                        })
                    }
                })
                return albums;
            });
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = fetchAlbums;