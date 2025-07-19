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
exports.getSecret = getSecret;
const secret_manager_1 = require("@google-cloud/secret-manager");
const secretClient = new secret_manager_1.SecretManagerServiceClient();
function getSecret(secretId, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const fullName = `projects/${projectId || process.env.GOOGLE_CLOUD_PROJECT}/secrets/${secretId}/versions/latest`;
        const [version] = yield secretClient.accessSecretVersion({ name: fullName });
        const secret = (_b = (_a = version.payload) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.toString();
        if (!secret) {
            throw new Error("Secret is empty or not found.");
        }
        return secret;
    });
}
