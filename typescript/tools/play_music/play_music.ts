import axios from "axios";
import { z } from "zod";
import getSecret from "../../lib/SecretHandler";
import { SecretIds } from "../../constants/SecretIds";

export const PlayMusicParamSchema = {
  title: z.string(),
  artist: z.string(),
};

type PlayMusicParamType = typeof PlayMusicParamSchema;

export async function play_music(param: PlayMusicParamType) {
  const iftttInstanceId = await getSecret(SecretIds.IFTTT_RUN_MUSIC_KEY);

  const link = `https://maker.ifttt.com/trigger/play_song/with/key/${iftttInstanceId}`;

  // don't care about response
  const response = await axios.get<string>(link, {
    params: {
      value1: JSON.stringify(param)
    },
  });

  return response.data;
}
