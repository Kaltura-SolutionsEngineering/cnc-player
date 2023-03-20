"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const getJwt_1 = require("./getJwt");
const getKs_1 = require("./getKs");
const config_1 = __importDefault(require("./config"));
const router = new router_1.default({ prefix: '/embed-cnc' });
const { id: partnerId } = config_1.default.get('partner');
router.get('/init-data', async (ctx) => {
    const [ks, jwt] = await Promise.all([(0, getKs_1.getKs)(), (0, getJwt_1.getJwt)()]);
    ctx.body = { ks, jwt, success: true };
});
router.get('/foobar', async (ctx) => {
    ctx.body = "Ta-Da!";
    ctx.status = 200;
    return;
});
exports.default = router;
