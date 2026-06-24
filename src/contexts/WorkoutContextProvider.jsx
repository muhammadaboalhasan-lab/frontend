import { useState, useEffect } from "react";
import { WorkoutContext } from "./WorkoutContext";

export const WorkoutContextProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [aiGeneratedDescription, setAiGeneratedDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_KEY}/workouts`,
        );
        if (!response.ok) {
          throw new Error("Failed to load workouts");
        }
        const data = await response.json();
        setWorkouts(data.workouts ?? []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;
    const searchWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_KEY}/workouts/search?name=${query.trim()}`,
          { signal },
        );
        if (!response.ok) {
          throw new Error("Failed to search workouts");
        }
        const data = await response.json();
        setSearchResults(data.workouts ?? []);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    searchWorkouts();

    return () => {
      controller.abort();
      setSearchResults([]);
    };
  }, [query]);

  const addWorkout = async (workout) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_KEY}/workouts`,
        {
          method: "POST",
          body: JSON.stringify(workout),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to add workout");
      }
      const data = await response.json();
      if (data.workout) {
        setWorkouts((workouts) => [...workouts, data.workout]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkout = async (id) => {
    try {
      setLoading(true);
      await fetch(`${import.meta.env.VITE_BACKEND_API_KEY}/workouts/${id}`, {
        method: "DELETE",
      });
      setWorkouts((workouts) =>
        workouts.filter((workout) => workout.id !== id),
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const aiGenerateDescription = async (prompt) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_KEY}/ai/generateWorkout`,
        {
          method: "POST",
          body: JSON.stringify({ prompt }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to generate description");
      }
      const data = await response.json();
      setAiGeneratedDescription(data.description);
    } catch (error) {
      if (error.name === "AbortError") return;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        loading,
        error,
        query,
        searchResults,
        aiGeneratedDescription,
        addWorkout,
        deleteWorkout,
        setQuery,
        setError,
        setAiGeneratedDescription,
        aiGenerateDescription,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
