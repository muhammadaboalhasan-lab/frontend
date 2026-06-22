import { useEffect, useState } from "react";
import Home from "./pages/Home";
function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API_KEY}/`);
      const data = await res.json();
      setMessage(data.message);
    };

    fetchData();
  }, []);
  return <Home message={message} />;
}
export default App;
