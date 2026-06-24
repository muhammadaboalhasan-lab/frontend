import { NavLink } from "react-router-dom";
import { Dumbbell, List, PlusCircle, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { asideStyle as s } from "./asideStyle";

const links = [
  { to: "/workouts", label: "Workouts", icon: List },
  { to: "/add-workouts", label: "Add Workout", icon: PlusCircle },
  { to: "/search-workouts", label: "Search", icon: Search },
];

function Aside() {
  return (
    <aside className={s.aside}>
      <div className={s.brand}>
        <span className={s.brandIcon}>
          <Dumbbell className="size-5" />
        </span>
        <span className={s.brandText}>Workout Tracker</span>
      </div>

      <nav className={s.nav}>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => cn(s.link, isActive && s.linkActive)}
          >
            <Icon className="size-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Aside;
