import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Router>
      {/* Background Video Container - Fixed to viewport, behind all content */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/web%20page%20video.mp4"
        >
          <source src="/web%20page%20video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
