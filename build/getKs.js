"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKs = void 0;
const kaltura_client_1 = __importDefault(require("kaltura-client"));
const config_1 = __importDefault(require("./config"));
const serviceUrl = config_1.default.get('kalturaUrl');
const { id: partnerId, adminSecret, adminUserId } = config_1.default.get('partner');
const clientConfig = new kaltura_client_1.default.Configuration({ serviceUrl });
const client = new kaltura_client_1.default.Client(clientConfig);
const type = kaltura_client_1.default.enums.SessionType.ADMIN;
const expiry = 86400;
const privileges = 'disableentitlement';
async function getKs() {
    const response = await kaltura_client_1.default.services.session
        .start(adminSecret, adminUserId, type, partnerId, expiry, privileges)
        .execute(client);
    return response;
}
exports.getKs = getKs;
