import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ToolsInfo } from "./tools/toolsInfo";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import EnvHandler from "./lib/EnvHandler";
import { randomUUID } from "crypto";
import express from "express";
import cors from "cors";

const server = new McpServer({
  name: "demo-server",
  version: "1.0.0",
});

ToolsInfo.forEach((tool) => server.registerTool(...tool));

const envHandler = EnvHandler.getInstance();

const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: () => randomUUID(),
});

if (!server.isConnected) server.connect(transport);

const app = express();
app.use(cors());

app.post("/mcp", (req, res) => {
  transport.handleRequest(req, res, req.body);
});

const port = parseInt(
  envHandler.getEnvValue({
    key: "PORT",
  }) ?? "3000",
  10
);

app.listen(port, () => {
  console.log(`🌐 Express server running on http://localhost:${port}`);
});
