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
          `${import.meta.env.VITE_API_URL}/workouts`,
        );
        const data = await response.json();
        setWorkouts(data.workouts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const searchWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/workouts?search=${query}`,
          { signal },
        );
        const data = await response.json();
        setSearchResults(data.workouts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    searchWorkouts();

    return () => controller.abort();
  }, [query]);

  const addWorkout = async (workout) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/workouts`, {
        method: "POST",
        body: JSON.stringify(workout),
      });
      const data = await response.json();
      setWorkouts((workouts) => [...workouts, data.workout]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkout = async (id) => {
    try {
      setLoading(true);
      await fetch(`${import.meta.env.VITE_API_URL}/workouts/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const aiGenerateDescription = async (workout) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ai/generateWorkout`,
        {
          method: "POST",
          body: JSON.stringify(workout),
        },
      );
      const data = await response.json();
      setAiGeneratedDescription(data.description);
    } catch (error) {
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
        aiGenerateDescription,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
