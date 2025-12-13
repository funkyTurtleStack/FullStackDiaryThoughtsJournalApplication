import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EntryPage from "./pages/EntryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/entries" element={<EntryPage />} />
      </Routes>
    </Router>
  );
}

export default App;