const http = require('http')
const fs = require('fs');
const fetchWorks = require('./fetchWorks');

async function app() {
    let baseUrl = 'http://my.poco.cn/act/act_list.php?user_id=53393816&p=';
    // let url = 'http://my.poco.cn/act/act_list.htx?user_id=55629005&p=2';
    
    let i,url,works;
    let workArray = [];
    
    for (i=1; i<=1; i++) {
        url = baseUrl + i;
        works = await fetchWorks(url)
        workArray.push(works);
    }
    return workArray;
}

app().then(v => console.log(v))