"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwt = void 0;
const kaltura_client_1 = __importDefault(require("kaltura-client"));
const config_1 = __importDefault(require("./config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const serviceUrl = config_1.default.get('kalturaUrl');
const { id: partnerId, adminSecret, adminUserId } = config_1.default.get('partner');
const cncUserId = config_1.default.get('cnc.userId');
const eventId = config_1.default.get('eventId');
const clientConfig = new kaltura_client_1.default.Configuration({ serviceUrl });
const CnCExpirationMinutes = 24 * 60;
async function getJwt() {
    const token = await getAppToken();
    return signJwt(token);
}
exports.getJwt = getJwt;
function signJwt(secret) {
    const exp = Math.floor(Date.now() / 1000) + 60 * CnCExpirationMinutes;
    const user = {
        partnerId,
        uid: cncUserId,
        groups: [],
        exp,
        isAdmin: false,
        virtualEventId: eventId,
        isScopedUser: true,
    };
    return jsonwebtoken_1.default.sign(user, secret, { header: { kid: partnerId, alg: 'HS256' } });
}
async function getAppToken() {
    const client = await getSessionClient();
    const filter = new kaltura_client_1.default.objects.AppTokenFilter({ statusEqual: kaltura_client_1.default.enums.AppTokenStatus.ACTIVE });
    const pager = new kaltura_client_1.default.objects.FilterPager();
    const result = await kaltura_client_1.default.services.appToken.listAction(filter, pager).execute(client);
    const appToken = result.objects.filter(({ sessionPrivileges }) => sessionPrivileges === 'cncAuth:true');
    if (appToken.length !== 1) {
        throw new Error(`Failed to find one an app token, found ${appToken.length}`);
    }
    return appToken === null || appToken === void 0 ? void 0 : appToken[0].token;
}
async function getSessionClient() {
    const client = new kaltura_client_1.default.Client(clientConfig);
    return await new Promise((res, rej) => {
        kaltura_client_1.default.services.session
            .start(adminSecret, adminUserId, kaltura_client_1.default.enums.SessionType.ADMIN, partnerId)
            .completion((success, ks) => {
            if (!success) {
                return rej(ks.message);
            }
            client.setKs(ks);
            res(client);
        })
            .execute(client);
    });
}
