import { useWorkout } from "@/hooks/useWorkout";
import WorkoutCard from "@/components/WorkoutCard/WorkoutCard";
import Spinner from "@/components/Spinner/Spinner";
import { workoutsStyle as s } from "./styles/workoutsStyle";

function Workouts() {
  const { workouts, loading } = useWorkout();

  return (
    <section className={s.page}>
      <header className={s.header}>
        <h1 className={s.title}>Workouts</h1>
        <p className={s.subtitle}>Browse all your workouts</p>
      </header>

      {loading && workouts.length === 0 ? (
        <div className={s.loaderWrap}>
          <Spinner size="lg" />
        </div>
      ) : workouts.length === 0 ? (
        <div className={s.empty}>
          No workouts yet. Add your first workout to get started.
        </div>
      ) : (
        <div className={s.grid}>
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Workouts;
