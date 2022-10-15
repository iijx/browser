
export enum WebType {
    Normal,
    DEFAULT_ADD,
}
export class CollectionWeb {
    name: string = "";
    icon: string = "";
    url: string = "";
    type: WebType = WebType.Normal;
    constructor(name: string, icon: string, url: string, type: WebType = WebType.Normal) {
        this.name = name;
        this.icon = icon;
        this.url = url;
        this.type = type;
    }
}