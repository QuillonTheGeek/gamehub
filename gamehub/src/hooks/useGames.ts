import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import axios from "axios";

interface Game {
  id: number;
  name: string;
}

interface FetchGames {
  count: number;
  results: Game[];
}

function useGames() {
    const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController()
    
    apiClient
      .get<FetchGames>("/games", {signal: controller.signal})
      .then((res) => setGames(res.data.results))
      .catch(function (error) {
        if (axios.isCancel(error)) return;
        setError(error.message);
        // setLoading(false);
      });

      return () => controller.abort()
  }, []);
  return { games, error }
}

export default useGames