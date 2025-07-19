import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { play_music, PlayMusicParamSchema } from "./play_music/play_music";
import { ToolId } from "./toolsEnum";
import {
  search_music,
  SearchMusicParamSchema,
} from "./search_music/search_music";

export const ToolsInfo: Array<Parameters<McpServer["registerTool"]>> = [
  [
    ToolId.PLAY_MUSIC.toString(),
    {
      title: ToolId.PLAY_MUSIC.toString(),
      description: "Play given music on user's phone",
      inputSchema: PlayMusicParamSchema,
    },
    async ({ title, artist }) => ({
      content: [{ type: "text", text: await play_music({ title, artist }) }],
    }),
  ],
  [
    ToolId.SEARCH_MUSIC.toString(),
    {
      title: ToolId.SEARCH_MUSIC.toString(),
      description:
        "Search Music using iTunes API to get full song title and artist string",
      inputSchema: SearchMusicParamSchema,
    },
    async ({ musicName }) => ({
      content: [{ type: "text", text: await search_music({ musicName }) }],
    }),
  ],
];
