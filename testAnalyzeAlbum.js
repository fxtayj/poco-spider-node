const http = require('http');
const analyzeAlbum = require('./analyzeAlbum');

let testWorks = [ { workName: '空華',
    workUrl: 'http://my.poco.cn/lastphoto_v2-htx-id-5381135-user_id-53393816-p-0.xhtml' },
  { workName: '彼女の夏',
    workUrl: 'http://my.poco.cn/lastphoto_v2-htx-id-5185810-user_id-53393816-p-0.xhtml' },
  { workName: '初夏。',
    workUrl: 'http://my.poco.cn/lastphoto_v2-htx-id-5094296-user_id-53393816-p-0.xhtml' },
  { workName: '「桜時」',
    workUrl: 'http://my.poco.cn/lastphoto_v2-htx-id-5063276-user_id-53393816-p-0.xhtml' },
  { workName: '旅立つ日。',
    workUrl: 'http://my.poco.cn/lastphoto_v2-htx-id-5028146-user_id-53393816-p-0.xhtml' },
  { workName: '台湾机车环岛日记',
    workUrl: 'http://my.poco.cn/lastphoto_v2-htx-id-5023631-user_id-53393816-p-0.xhtml' },
  { workName: '视频 - 夏空 - Hi-Fi CAMP - だから一歩前へ踏み出して',
    workUrl: 'http://blog1.poco.cn/myBlogDetail-htx-id-8842347-userid-53393816-pri--n-0.xhtml' },
  { workName: '梦。',
    workUrl: 'http://my.poco.cn/lastphoto_v2-htx-id-5005509-user_id-53393816-p-0.xhtml' },
  { workName: '畢業謹賀',
    workUrl: 'http://my.poco.cn/lastphoto_v2-htx-id-4797835-user_id-53393816-p-0.xhtml' },
  { workName: '玉響',
    workUrl: 'http://my.poco.cn/lastphoto_v2-htx-id-4773029-user_id-53393816-p-0.xhtml' } ]

for (let work of testWorks) {
    analyzeAlbum(work.workUrl,work.workName);
}
