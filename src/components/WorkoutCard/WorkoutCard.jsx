import { Trash2 } from "lucide-react";
import { useWorkout } from "@/hooks/useWorkout";
import { LoadingOverlay } from "@/components/Spinner/Spinner";
import { workoutCardStyle as s } from "./workoutCardStyle";

function WorkoutCard({ workout, deletable = true }) {
  const { deleteWorkout, loading } = useWorkout();

  const handleDelete = () => {
    deleteWorkout(workout.id);
  };

  return (
    <article className={s.card}>
      {loading && <LoadingOverlay />}
      <div className={s.header}>
        <h3 className={s.name}>{workout.name}</h3>
        {deletable && (
          <button
            type="button"
            className={s.delete}
            onClick={handleDelete}
            aria-label={`Delete ${workout.name}`}
          >
            <Trash2 className="size-4" />
          </button>
        )}
      </div>
      <span className={s.badge}>{workout.muscleGroup}</span>
      <p className={s.description}>{workout.description}</p>
    </article>
  );
}

export default WorkoutCard;
