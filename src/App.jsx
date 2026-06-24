import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WorkoutContextProvider } from "./contexts/WorkoutContextProvider";
import Workouts from "./pages/Workouts";
import AddWorkouts from "./pages/AddWorkouts";
import SearchWorkouts from "./pages/SearchWorkouts";
import Aside from "./components/Aside/Aside";

function App() {
  return (
    <WorkoutContextProvider>
      <BrowserRouter>
        <Aside />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/workouts" />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/add-workouts" element={<AddWorkouts />} />
            <Route path="/search-workouts" element={<SearchWorkouts />} />
          </Routes>
        </main>
      </BrowserRouter>
    </WorkoutContextProvider>
  );
}
export default App;
