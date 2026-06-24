import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WorkoutContextProvider } from "./contexts/WorkoutContextProvider";
import Workouts from "./pages/Workouts";
import AddWorkouts from "./pages/AddWorkouts";
import SearchWorkouts from "./pages/SearchWorkouts";
import Aside from "./components/Aside/Aside";
import ErrorModal from "./components/ErrorModal/ErrorModal";

function App() {
  return (
    <WorkoutContextProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col md:flex-row">
          <Aside />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Navigate to="/workouts" />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/add-workouts" element={<AddWorkouts />} />
              <Route path="/search-workouts" element={<SearchWorkouts />} />
            </Routes>
          </main>
        </div>
        <ErrorModal />
      </BrowserRouter>
    </WorkoutContextProvider>
  );
}
export default App;
