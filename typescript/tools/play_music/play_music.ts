import axios from "axios";
import EnvHandler from "../../lib/EnvHandler";
import { z } from "zod";

export const PlayMusicParamSchema = {
  title: z.string(),
  artist: z.string(),
};

type PlayMusicParamType = typeof PlayMusicParamSchema;

export async function play_music(param: PlayMusicParamType) {
  const envHandler = EnvHandler.getInstance();

  const iftttInstanceId = envHandler.getEnvValue({
    key: "IFTTT_RUN_MUSIC_KEY",
  });

  const link = `https://maker.ifttt.com/trigger/play_song/with/key/${iftttInstanceId}`;

  // don't care about response
  const response = await axios.get<string>(link, {
    params: param,
  });

  return response.data;
}
