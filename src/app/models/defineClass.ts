

export class Hero {
    constructor(
        public id       : number,
        public name     : string,
        public power    : string,

        // optional field (alterEgo).
        public alterEgo?: string
    ) {  }
}


export class ProjectItem {

        id:        string;
        name:      string;
        language:   string;
        technology: string;
        data:       string;
        host:       string;
        img1 :      string; 
        img2 :      string;  
        img3 :      string;
        link1 :     string; 
        link2 :     string;
}


export class   Goods {
    constructor(
        public id:             number,
        public cat_id:         number,
        public goods_id:       number,
        public goods_sn:       string,

        public brand_id:       number,
        public goods_name:     string,
        public shop_price:     number,
        public market_price:   number,
        public goods_quantity:   number,
        public sold_quantity:    number,
        public goods_weight:   number,
        public goods_brief:    string,
        public goods_desc:     string,
        public thumb_img:      string,
        public goods_img:      string,
        public ori_img:        string,
        public is_on_sale:     boolean,
        public is_delete:      boolean,
        public is_best:        boolean,
        public is_new:         boolean,
        public is_free_post:   boolean,
        public add_time:       Date,
        public last_update:    Date){}
}


export class   FileItem {
    constructor(
            public OriginalPath : string,
            public FullPath     : string
    ){}
}