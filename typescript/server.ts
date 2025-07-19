import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ToolsInfo } from "./tools/toolsInfo";
import express from "express";
import cors from "cors";
import TransportManager from "./lib/TransportManager";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { ToolsPrompts } from "./tools/toolsPrompts";

const server = new McpServer({
  name: "demo-server",
  version: "1.0.0",
});

ToolsInfo.forEach((tool) => server.registerTool(...tool));
ToolsPrompts.forEach((prompt) => server.registerPrompt(...prompt));

const app = express();
// Add CORS middleware before your MCP routes
app.use(
  cors({
    origin: "*", // Configure appropriately for production, for example:
    // origin: ['https://your-remote-domain.com', 'https://your-other-remote-domain.com'],
    exposedHeaders: ["Mcp-Session-Id"],
    allowedHeaders: ["Content-Type", "mcp-session-id"],
  })
);
app.use(express.json());

const transportManager = TransportManager.getInstance();

app.post("/mcp", async (req, res) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  const transport = (() => {
    if (sessionId && transportManager.sessionPresent(sessionId)) {
      return transportManager.getExistingTransport(sessionId);
    } else if (isInitializeRequest(req.body) && !sessionId) {
      const transport = transportManager.createNewTransport();
      server.connect(transport);
      return transport;
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

const getAndDeleteHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  if (!sessionId || !transportManager.sessionPresent(sessionId)) {
    res.status(400).send("Invalid or missing session ID");
    return;
  }

  await transportManager
    .getExistingTransport(sessionId)
    .handleRequest(req, res);
};

// Handle GET requests for server-to-client notifications via SSE
app.get("/mcp", getAndDeleteHandler);

// Handle DELETE requests for session termination
app.delete("/mcp", getAndDeleteHandler);

const port = parseInt(process.env["PORT"] ?? "3000", 10);

app.listen(port, () => {
  console.log(`🌐 Express server running on http://localhost:${port}`);
});
