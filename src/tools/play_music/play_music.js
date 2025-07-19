"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayMusicParamSchema = void 0;
exports.play_music = play_music;
const axios_1 = __importDefault(require("axios"));
const SecretHandler_1 = __importDefault(require("../../lib/SecretHandler"));
const zod_1 = require("zod");
exports.PlayMusicParamSchema = {
    title: zod_1.z.string(),
    artist: zod_1.z.string(),
};
function play_music(param) {
    return __awaiter(this, void 0, void 0, function* () {
        const envHandler = SecretHandler_1.default.getInstance();
        const iftttInstanceId = envHandler.getEnvValue({
            key: "IFTTT_RUN_MUSIC_KEY",
        });
        const link = `https://maker.ifttt.com/trigger/play_song/with/key/${iftttInstanceId}`;
        // don't care about response
        const response = yield axios_1.default.get(link, {
            params: param,
        });
        return response.data;
    });
}
