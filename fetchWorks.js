const cheerio = require('cheerio');
const http = require('http')
const iconv = require('iconv-lite');
const analyzeAlbum = require('./analyzeAlbum');

//解析作品集页面，获取作品页面信息
async function fetchWorks(url) {
    url = url ? url : 'http://my.poco.cn/act/act_list.php?user_id=53393816&p=1';
    try {
        await http.get(url, function (res) {
            var chunks = [];

            res.on('data', function (chunk) {
                chunks.push(chunk);
            });

            res.on('end', function () {
                let works = [];
                let html = iconv.decode(Buffer.concat(chunks), 'gb2312');
                let $ = cheerio.load(html, {
                    decodeEntities: false
                });
                $('h2.title a').each(function (idx, element) {
                    var $element = $(element);
                    if (!$element.text() == '') {
                        works.push({
                            workName: $element.text(),
                            workUrl: $element.attr('href')
                        })
                    }
                })
                return works;
            });
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = fetchWorks;