"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const toolsInfo_1 = require("./tools/toolsInfo");
const streamableHttp_js_1 = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
const crypto_1 = require("crypto");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const server = new mcp_js_1.McpServer({
    name: "demo-server",
    version: "1.0.0",
});
toolsInfo_1.ToolsInfo.forEach((tool) => server.registerTool(...tool));
const transport = new streamableHttp_js_1.StreamableHTTPServerTransport({
    sessionIdGenerator: () => (0, crypto_1.randomUUID)(),
});
if (!server.isConnected)
    server.connect(transport);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.post("/mcp", (req, res) => {
    transport.handleRequest(req, res, req.body);
});
const port = parseInt((_a = process.env["PORT"]) !== null && _a !== void 0 ? _a : "3000", 10);
app.listen(port, () => {
    console.log(`🌐 Express server running on http://localhost:${port}`);
});
