import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { PlayMusicParamSchema } from "./play_music/play_music";
import { ToolId } from "./toolsEnum";
import { SearchMusicParamSchema } from "./search_music/search_music";

export const ToolsPrompts: Array<Parameters<McpServer["registerPrompt"]>> = [
  [
    ToolId.PLAY_MUSIC.toString(),
    {
      title: `${ToolId.PLAY_MUSIC.toString()} Prompt`,
      description: `Create a prompt to process the ${ToolId.PLAY_MUSIC.toString()} tool for playing song in user's phone`,
      argsSchema: PlayMusicParamSchema,
    },
    ({ message }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please process this message for ${ToolId.PLAY_MUSIC.toString()}: ${message}`,
          },
        },
      ],
    }),
  ],
  [
    ToolId.SEARCH_MUSIC.toString(),
    {
      title: `${ToolId.SEARCH_MUSIC.toString()} Prompt`,
      description: `Create a prompt to process the ${ToolId.SEARCH_MUSIC.toString()} tool for searching song using iTunes API`,
      argsSchema: SearchMusicParamSchema,
    },
    ({ message }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please process this message for ${ToolId.SEARCH_MUSIC.toString()}: ${message}`,
          },
        },
      ],
    }),
  ],
];
