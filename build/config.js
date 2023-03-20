"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const convict_1 = __importDefault(require("convict"));
const config = (0, convict_1.default)({
    port: {
        doc: 'The port to server from',
        format: 'port',
        default: 9005,
        arg: 'port',
    },
    cnc: {
        userId: {
            doc: 'CNC user to use and return JWT for.',
            format: String,
            default: null,
            env: 'KALTURA_ADMIN_USER_ID',
        },
    },
    kalturaUrl: {
        doc: 'Kaltura URl',
        format: String,
        default: 'https://www.kaltura.com',
    },
    eventId: {
        doc: 'Kaltura Event Id',
        format: Number,
        default: null,
        env: "KALTURA_EVENT_ID",
    },
    partner: {
        id: {
            doc: 'Partner id',
            format: String,
            default: null,
            env: 'KALTURA_PARTNER_ID',
        },
        adminSecret: {
            doc: 'Admin secret',
            format: String,
            sensitive: true,
            default: null,
            env: 'KALTURA_ADMIN_SECRET',
        },
        adminUserId: {
            doc: 'Admin user id',
            format: String,
            default: null,
            env: 'KALTURA_ADMIN_USER_ID',
        },
    },
});
config.validate({ allowed: 'strict' });
exports.default = config;
