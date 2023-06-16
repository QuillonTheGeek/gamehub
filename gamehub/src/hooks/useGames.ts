import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import axios, { CancelTokenSource } from "axios";
import { Genre } from "./useGenres";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

interface FetchGames {
  count: number;
  results: Game[];
}

function useGames(selectedGenre: Genre | null) {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = axios.CancelToken.source();

    setLoading(true);
    let url = "/games";

    const params: { genres?: number } = {}; // Define params object type

    if (selectedGenre) {
      params.genres = selectedGenre.id;
    }

    apiClient
      .get<FetchGames>(url, {
        cancelToken: controller.token,
        params: params,
      })
      .then((res) => {
        setGames(res.data.results);
        setLoading(false);
      })
      .catch(function (error) {
        if (axios.isCancel(error)) return;
        setError(error.message);
        setLoading(false);
      });

    return () => controller.cancel();
  }, [selectedGenre]);

  return { games, error, isLoading };
}

export default useGames;
