import axios from "axios";
import { z } from "zod";

// https://performance-partners.apple.com/search-api
type SongDetail = {
  wrapperType: "track";
  kind: "song";
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  collectionArtistName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  previewUrl?: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  collectionPrice: number;
  trackPrice: number;
  releaseDate: string; // ISO 8601 format
  collectionExplicitness: "notExplicit" | "explicit";
  trackExplicitness: "notExplicit" | "explicit";
  discCount: number;
  discNumber: number;
  trackCount: number;
  trackNumber: number;
  trackTimeMillis?: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  isStreamable: boolean;
};

type Response = {
  resultCount: number;
  results: Array<SongDetail>;
};

export const SearchMusicParamSchema = {
  musicName: z.string(),
};

export async function search_music({
  musicName,
}: typeof SearchMusicParamSchema): Promise<string> {
  const response = await axios.get<Response>(
    "https://itunes.apple.com/search",
    {
      params: {
        media: "music",
        limit: 5,
        term: musicName,
        country: "IN",
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(JSON.stringify(response.data));
  }

  const responseData = response.data;

  if (responseData.resultCount === 0) {
    throw new Error("No Result Found");
  }

  return JSON.stringify(
    responseData.results.map((e) => ({
      title: e.trackName,
      artist: e.artistName,
    }))
  );
}
