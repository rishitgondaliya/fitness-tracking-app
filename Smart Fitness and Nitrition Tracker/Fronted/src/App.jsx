import "./App.css";
import { Navbar } from "../src/components/common/Navbar";
import { Footer } from "../src/components/common/Footer";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import { Error } from "./pages/Error";
import { NutritionDashboard } from "./pages/NutritionDashboard";
import { Workout } from "./pages/Workout";
import { News } from "./pages/News";
import ProgressDashboard from "./pages/ProgressDashboard";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { Profile } from "./pages/Profile";
function App() {
  return (
    <div className="w-screen min-h-screen  flex flex-col">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />

        <Route
          path="/nutrition-dashboard"
          element={
            <PrivateRoute>
              <NutritionDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/workouts"
          element={
            <PrivateRoute>
              <Workout />
            </PrivateRoute>
          }
        />

        <Route path="/news" element={<News />} />

        <Route
          path="/progress-dashboard"
          element={
            <PrivateRoute>
              <ProgressDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/my-profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
