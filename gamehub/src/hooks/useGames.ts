import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import axios from "axios";

export interface Platform {
    id: number,
    name: string,
    slug: string
}

 export interface Game {
  id: number;
  name: string;
  background_image: string,
  parent_platforms: {platform: Platform}[],
  metacritic: number
}

interface FetchGames {
  count: number;
  results: Game[];
}

function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading]= useState(false)

  useEffect(() => {
    const controller = new AbortController()
    
    setLoading(true)
    apiClient
      .get<FetchGames>("/games", {signal: controller.signal})
      .then((res) => {
      setGames(res.data.results)
      setLoading(false)})
      .catch(function (error) {
        if (axios.isCancel(error)) return;
        setError(error.message)
        setLoading(false);
        // setLoading(false);
      });

      return () => controller.abort()
  }, []);
  return { games, error, isLoading }
}

export default useGames