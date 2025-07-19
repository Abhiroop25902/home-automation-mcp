import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { PlayMusicParamSchema } from "./play_music/play_music";
import { ToolId } from "./toolsEnum";

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
            text: `Please process this message: ${message}`,
          },
        },
      ],
    }),
  ],
];
