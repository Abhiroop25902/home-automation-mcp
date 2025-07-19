import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { play_music, PlayMusicParamSchema } from "./play_music/play_music";
import { ToolId } from "./toolsEnum";

export const ToolsInfo: Array<Parameters<McpServer["registerTool"]>> = [
  [
    ToolId.PLAY_MUSIC.toString(),
    {
      title: ToolId.PLAY_MUSIC.toString(),
      description:
        "Generate a notification on iPhone, tapping on which Plays the Music",
      inputSchema: PlayMusicParamSchema,
    },
    async ({ title, artist }) => ({
      content: [{ type: "text", text: await play_music({ title, artist }) }],
    }),
  ],
];
