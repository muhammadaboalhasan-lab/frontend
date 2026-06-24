import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useWorkout } from "@/hooks/useWorkout";
import { Button } from "@/components/ui/button";
import Spinner, { LoadingOverlay } from "@/components/Spinner/Spinner";
import { MUSCLE_GROUPS } from "@/constants/muscleGroups";
import { addWorkoutsStyle as s } from "./styles/addWorkoutsStyle";

function AddWorkouts() {
  const {
    addWorkout,
    aiGenerateDescription,
    aiGeneratedDescription,
    setAiGeneratedDescription,
    loading,
  } = useWorkout();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");

  const canGenerate = name.trim() && muscleGroup && !loading;
  const canSubmit =
    name.trim() && muscleGroup && aiGeneratedDescription.trim() && !loading;

  const handleGenerate = () => {
    aiGenerateDescription(`A ${muscleGroup} workout called ${name}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addWorkout({ name, muscleGroup, description: aiGeneratedDescription });
    setAiGeneratedDescription("");
    navigate("/workouts");
  };

  return (
    <section className={s.page}>
      <header className={s.header}>
        <h1 className={s.title}>Add Workout</h1>
        <p className={s.subtitle}>Create a new workout for your routine</p>
      </header>

      <form className={s.card} onSubmit={handleSubmit}>
        {loading && <LoadingOverlay label="Please wait..." />}

        <div className={s.field}>
          <label className={s.label} htmlFor="name">
            Workout name
          </label>
          <input
            id="name"
            className={s.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Bench Press"
          />
        </div>

        <div className={s.field}>
          <label className={s.label} htmlFor="muscleGroup">
            Muscle group
          </label>
          <select
            id="muscleGroup"
            className={s.select}
            value={muscleGroup}
            onChange={(e) => setMuscleGroup(e.target.value)}
          >
            <option value="" disabled>
              Select a muscle group
            </option>
            {MUSCLE_GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div className={s.field}>
          <div className={s.descHeader}>
            <label className={s.label} htmlFor="description">
              Description
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGenerate}
              disabled={!canGenerate}
            >
              {loading ? <Spinner size="sm" /> : <Sparkles />}
              Generate
            </Button>
          </div>
          <textarea
            id="description"
            className={s.textarea}
            value={aiGeneratedDescription}
            onChange={(e) => setAiGeneratedDescription(e.target.value)}
            placeholder="Write a description, or generate one with AI."
          />
        </div>

        {aiGeneratedDescription.trim() && (
          <div className={s.field}>
            <span className={s.previewLabel}>
              <Sparkles className="size-3.5" />
              Preview
            </span>
            <div className={s.preview}>
              <ReactMarkdown>{aiGeneratedDescription}</ReactMarkdown>
            </div>
          </div>
        )}

        <div className={s.actions}>
          <Button type="submit" disabled={!canSubmit}>
            {loading ? <Spinner size="sm" /> : <Plus />}
            Add Workout
          </Button>
        </div>
      </form>
    </section>
  );
}

export default AddWorkouts;
