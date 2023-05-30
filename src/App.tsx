import { BrowserRouter } from "react-router-dom";
import Navigation from "./routes/Navigation";

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
}
