import useSWR from "swr";
import axios from "axios";
import { MD5 } from "crypto-js";
import { MARVEL_API_HASH, MARVEL_API_PATH, MARVEL_API_KEY } from "../../config";
import { useMemo } from "react";

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: {
    available: number;
    collectionURI: string;
    items: { resourceURI: string; name: string }[];
    returned: number;
  };
  series: {
    available: number;
    collectionURI: string;
    items: { resourceURI: string; name: string }[];
    returned: number;
  };
  stories: {
    available: number;
    collectionURI: string;
    items: { resourceURI: string; name: string; type: string }[];
    returned: number;
  };
  events: {
    available: number;
    collectionURI: string;
    items: { resourceURI: string; name: string }[];
    returned: number;
  };
  urls: {
    type: string;
    url: string;
  }[];
}

const fetcher = (url: string) => {
  const ts = new Date().getTime();
  const hash = MD5(ts + MARVEL_API_HASH).toString();
  return axios
    .get(url, {
      params: {
        ts,
        apikey: MARVEL_API_KEY,
        hash,
      },
    })
    .then((res) => res.data);
};

const useData = (url: string) => useSWR(url, fetcher);

export const useCharacters = () => {
  const { data, isLoading, error } = useData(
    `${MARVEL_API_PATH}/v1/public/characters`,
  );
  const characters = useMemo(() => data?.data?.results, [data]);
  return {
    data: characters,
    isLoading,
    error,
  };
};
export const useCharacter = (characterId: string | undefined) => {
  const { data, isLoading, error } = useData(
    `${MARVEL_API_PATH}/v1/public/characters/${characterId}`,
  );
  const details = useMemo(() => data?.data?.results?.[0], [data]);
  return {
    data: details,
    isLoading,
    error,
  } as const;
};
