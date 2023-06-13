import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import axios from "axios";

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

interface Genre {
  id: number,
  name: string,
   image_background: string;
}
interface FetchGenres{
  count: number;
  results: Genre[],
 
}

function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchGenres>("/genres", { signal: controller.signal })
      .then((res) => {
        setGenres(res.data.results);
        setLoading(false);
      })
      .catch(function (error) {
        if (axios.isCancel(error)) return;
        setError(error.message);
        setLoading(false);
        // setLoading(false);
      });

    return () => controller.abort();
  }, []);
  return { genres, error, isLoading };
}

export default useGenres;
