import { WorkoutContext } from "./WorkoutContext";

export const WorkoutContextProvider = ({ children }) => {
  return <WorkoutContext.Provider value={{}}>{children}</WorkoutContext.Provider>;
};