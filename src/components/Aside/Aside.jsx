import { NavLink } from "react-router-dom";
function Aside() {
  return (
    <nav>
      <NavLink to="/workouts">Workouts</NavLink>
      <NavLink to="/add-workouts">Add Workouts</NavLink>
      <NavLink to="/search-workouts">Search Workouts</NavLink>
    </nav>
  );
}

export default Aside;
