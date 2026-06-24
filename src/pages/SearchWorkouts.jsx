import { Search } from "lucide-react";
import { useWorkout } from "@/hooks/useWorkout";
import WorkoutCard from "@/components/WorkoutCard/WorkoutCard";
import Spinner from "@/components/Spinner/Spinner";
import { searchWorkoutsStyle as s } from "./styles/searchWorkoutsStyle";

function SearchWorkouts() {
  const { query, setQuery, searchResults, loading } = useWorkout();

  return (
    <section className={s.page}>
      <header className={s.header}>
        <h1 className={s.title}>Search Workouts</h1>
        <p className={s.subtitle}>Find workouts by name or muscle group</p>
      </header>

      <div className={s.searchWrap}>
        <Search className={s.searchIcon} />
        <input
          className={s.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search workouts..."
        />
        {loading && (
          <span className={s.searchSpinner}>
            <Spinner size="sm" />
          </span>
        )}
      </div>

      {!query.trim() ? (
        <div className={s.empty}>
          Start typing to search through your workouts.
        </div>
      ) : searchResults.length === 0 && !loading ? (
        <div className={s.empty}>No workouts match your search.</div>
      ) : (
        <div className={s.grid}>
          {searchResults.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}

export default SearchWorkouts;
