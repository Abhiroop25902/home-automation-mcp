import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { InMemoryEventStore } from "@modelcontextprotocol/sdk/examples/shared/inMemoryEventStore.js";

import { randomUUID } from "crypto";

export default class TransportManager {
  static #instance: TransportManager;

  private constructor() {}

  static getInstance(): TransportManager {
    if (TransportManager.#instance) return TransportManager.#instance;

    TransportManager.#instance = new TransportManager();

    return TransportManager.#instance;
  }

  readonly #transports: { [sessionId: string]: StreamableHTTPServerTransport } =
    {};

  sessionPresent(sessionId: string): boolean {
    return this.#transports.hasOwnProperty(sessionId);
  }

  createNewTransport(): StreamableHTTPServerTransport {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: randomUUID,
      enableJsonResponse: true,
      eventStore: new InMemoryEventStore(),
      onsessioninitialized: (sId: string) => {
        this.#transports[sId] = transport;
      },
    });

    transport.onclose = () => {
      const sid = transport.sessionId;
      console.log(
        `Transport closed for session ${sid}, removing from transports map`
      );
      if (sid && this.#transports[sid]) delete this.#transports[sid];
    };

    return transport;
  }

  getExistingTransport(sessionId: string): StreamableHTTPServerTransport {
    if (!this.sessionPresent(sessionId))
      throw new Error(`Transport with id: ${sessionId} is not present`);

    return this.#transports[sessionId];
  }
}
