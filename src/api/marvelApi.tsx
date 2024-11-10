import { useMemo } from "react";
import useSWR from "swr";
import axios from "axios";
import { MD5 } from "crypto-js";
import useSWRInfinite from "swr/infinite";
import { MARVEL_API_HASH, MARVEL_API_PATH, MARVEL_API_KEY } from "../config";
import { Character } from "../model/Character";

const PAGE_SIZE = 20;

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
    .then((res) => (res.data as CharactersResponse).data);
};

type CharactersQueryParams = {
  nameStartsWith?: string;
  comics?: number;
  orderBy?: string;
  limit?: number;
  offset: number;
};

type CharactersData = {
  count: number;
  limit: number;
  offset: number;
  results: Character[];
  total: number;
};

type CharactersResponse = {
  attributionHTML: string;
  attributionText: string;
  code: number;
  copyright: string;
  data: CharactersData;
  etag: string;
  status: string;
};

export const useCharactersInfinite = (queryParams: CharactersQueryParams) => {
  const { data, error, isLoading, size, setSize } =
    useSWRInfinite<CharactersData>(
      (index) =>
        `${MARVEL_API_PATH}/v1/public/characters?limit=${PAGE_SIZE}${!!queryParams.nameStartsWith ? "nameStartsWith" + queryParams.nameStartsWith : ""}&orderBy=${queryParams.orderBy}&offset=${index * PAGE_SIZE}`,
      fetcher,
    );

  const { characters, allLoaded } = useMemo(() => {
    const characters = [];
    for (const segment of data || []) {
      characters.push(...segment.results);
    }
    return {
      characters,
      allLoaded: (data?.[0]?.total || 0) === (characters?.length || 0),
    };
  }, [data]);
  return {
    characters,
    isLoading,
    error,
    allLoaded,
    size,
    setSize,
  };
};

export const useCharacters = (queryParams: CharactersQueryParams) => {
  const URL: string = useMemo(() => {
    const baseUrl = `${MARVEL_API_PATH}/v1/public/characters`;
    const searchParams: Record<string, any> = new URLSearchParams();
    if (!!queryParams.nameStartsWith) {
      searchParams.append("nameStartsWith", queryParams.nameStartsWith);
    }
    if (!!queryParams.comics) {
      searchParams.append("comics", queryParams.comics);
    }
    if (!!queryParams.orderBy) {
      searchParams.append("orderBy", queryParams.orderBy);
    }
    if (!!queryParams.limit) {
      searchParams.append("limit", queryParams.limit);
    }
    if (!!queryParams.offset) {
      searchParams.append("offset", queryParams.offset);
    }

    return searchParams.size
      ? `${baseUrl}?${searchParams.toString()}`
      : baseUrl;
  }, [queryParams]);

  const { data, isLoading, error } = useSWR(URL, fetcher);

  const characters = useMemo(() => data?.results, [data]);
  return {
    characters,
    isLoading,
    error,
  };
};

export const useCharacter = (characterId: string | undefined) => {
  const { data, isLoading, error } = useSWR(
    `${MARVEL_API_PATH}/v1/public/characters/${characterId}`,
    fetcher,
  );

  const details = useMemo(() => data?.results?.[0], [data]);
  return {
    data: details,
    isLoading,
    error,
  };
};
