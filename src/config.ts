import iconBing from './static/imgs/icon-bing.png'
import iconBaidu from './static/imgs/icon-baidu.png'
import iconZhihu from './static/imgs/icon-zhihu.png'

export class WebSite {
    name: string;
    icon: string;
    url: string;
    keyword: string[];
    constructor(name: string, icon: string, url: string, keyword: string[] = []) {
        this.name = name;
        this.icon = icon;
        this.url = url;
        this.keyword = keyword;
    }
}

// 自动切换 的搜索引擎
export const WEB_SITES_DEFAULT = [
    new WebSite('baidu', iconBaidu, 'https:///www.baidu.com/s?fasd=1&word='),
    new WebSite('bing', iconBing, 'https://bing.com/search?q='),
]

// 需要主动触发 的搜索引擎
export const WEB_SITES_MANUAL = [
    new WebSite('zhihu', iconBaidu, 'https://www.zhihu.com/search?type=content&q=', ['zhihu', '知乎']),
]
