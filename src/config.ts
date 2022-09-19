import iconBing from './static/imgs/icon-bing.png'
import iconBaidu from './static/imgs/icon-baidu.png'

export class WebSite {
    name: string;
    icon: string;
    url: string;
    constructor(name: string, icon: string, url: string) {
        this.name = name;
        this.icon = icon;
        this.url = url;
    }
}

export const WEB_SITES = [
    new WebSite('baidu', iconBaidu, 'https:///www.baidu.com/s?fasd=1&word='),
    new WebSite('bing', iconBing, 'https://bing.com/search?q='),
]
