"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnGoing = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const decryptor_js_1 = __importDefault(require("./decryptor.js"));
const BASEURL = "https://45.12.2.26";
const OnGoing = async (page = 1) => {
    let list = [];
    try {
        const base = await axios_1.default.get(`${BASEURL}/ongoing-anime/page/${page}`);
        const $ = cheerio_1.default.load(base.data);
        if (!$(".postbody").html()) {
            throw new Error("Page not found");
        }
        let maxPage = ~~$(".page > .pagination > a:not(.next, .prev)").last().text();
        $("article.bs > .bsx")
            .each((i, el) => {
            return list.push({
                tipe: $(el).find(".limit > .bt > span.type").text(),
                rating: $(el).find(".tt > .rating > i").text(),
                judul: $(el).find(".tt > h4").text(),
                gambar: $(el).find(".limit > img").attr("data-src").replace("?resize=145,207", ""),
                urlanimfo:$(el).find("a").attr("href"),
            });
        });
        return {
            page: ~~page,
            maxPage: maxPage,
            list: list,
        };
    }
    catch (err) {
        throw err;
    }
};
exports.OnGoing = OnGoing;
