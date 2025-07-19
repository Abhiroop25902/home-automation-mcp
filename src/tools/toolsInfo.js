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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsInfo = void 0;
const play_music_1 = require("./play_music/play_music");
exports.ToolsInfo = [
    [
        "PLAY_MUSIC" /* ToolId.PLAY_MUSIC */.toString(),
        {
            title: "PLAY_MUSIC" /* ToolId.PLAY_MUSIC */.toString(),
            description: "Generate a notification on iPhone, tapping on which Plays the Music",
            inputSchema: play_music_1.PlayMusicParamSchema,
        },
        (_a) => __awaiter(void 0, [_a], void 0, function* ({ title, artist }) {
            return ({
                content: [{ type: "text", text: yield (0, play_music_1.play_music)({ title, artist }) }],
            });
        }),
    ],
];
