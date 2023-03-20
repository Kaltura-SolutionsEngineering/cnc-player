"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const routs_1 = __importDefault(require("./routs"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_static_1 = __importDefault(require("koa-static"));
const koaApp = new koa_1.default();
const assets = (0, koa_static_1.default)('./public');
koaApp.use((0, koa_logger_1.default)());
koaApp.use(async (ctx, next) => {
    try {
        await next();
    }
    catch (error) {
        console.error(`API error for ${ctx.request.path}:`, error);
        ctx.body = error;
    }
});
koaApp.use((0, koa_bodyparser_1.default)());
koaApp.use(assets);
koaApp.use(routs_1.default.routes());
koaApp.use(routs_1.default.allowedMethods());
koaApp.listen(3000);
