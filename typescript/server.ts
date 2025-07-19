import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ToolsInfo } from "./tools/toolsInfo";
import express from "express";
import cors from "cors";
import TransportManager from "./lib/TransportManager";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";

const server = new McpServer({
  name: "demo-server",
  version: "1.0.0",
});

ToolsInfo.forEach((tool) => server.registerTool(...tool));

const app = express();
app.use(cors());
app.use(express.json());

app.post("/mcp", async (req, res) => {
  const transportManager = TransportManager.getInstance();
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  const transport = (() => {
    if (sessionId && transportManager.sessionPresent(sessionId)) {
      console.log(`Reusing session: ${sessionId}`);
      return transportManager.getExistingTransport(sessionId);
    } else if (isInitializeRequest(req.body) && !sessionId) {
      console.log(`New session request: ${req.body.method}`);
      return transportManager.createNewTransport();
    }

    return undefined;
  })();

  if (transport === undefined) {
    console.error(
      "Invalid request: No valid session ID or initialization request"
    );
    // Invalid request
    res.status(400).json({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Bad Request: No valid session ID provided",
      },
      id: null,
    });
    return;
  }

  await transport.handleRequest(req, res, req.body);
});

const port = parseInt(process.env["PORT"] ?? "3000", 10);

app.listen(port, () => {
  console.log(`🌐 Express server running on http://localhost:${port}`);
});
