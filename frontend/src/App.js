import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/mentee/Profile";
import Sidebar from "./components/CustomSidebar";
import { UserContext } from "./context/UserContext";
import CoursePage from "./pages/mentee/CoursePage";
import UserMarket from "./pages/mentee/UserMarket";
import CourseSummary from "./pages/mentee/CourseSummary";
import Test from "./pages/mentee/Test.js";
import MentorHomepage from "./pages/mentor/MentorHomepage";
import CourseStatus from "./pages/mentor/CourseStatus";
import NewCourse from "./pages/mentor/NewCourse";
import NewSection from "./pages/mentor/NewSection";
import AdminHomepage from "./pages/admin/AdminHomepage";
import Requests from "./pages/mentor/Requests.js";
import Feedback from "./pages/mentor/Feedback.js";
import { AuthProvider } from "./context/AuthContext.js";

function App() {
  const [user, setUser] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        {user && user.status === "junior" && <Sidebar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/course/:idCourse" element={<CoursePage />} />
          <Route path="/topics" element={<UserMarket />} />
          <Route path="/course-summary/:idCourse" element={<CourseSummary />} />
          <Route path="/mentor-homepage" element={<MentorHomepage />} />
          <Route path="/mentor-homepage/:idCourse" element={<CourseStatus />} />
          <Route path="/new-course" element={<NewCourse />} />
          <Route path="/new-section/:idCourse" element={<NewSection />} />
          <Route path="/admin" element={<AdminHomepage />} />
          <Route path="/requests/:idCourse" element={<Requests />} />
          <Route path="/feedback/:idCourse" element={<Feedback />} />
          {user && user.status === "junior" && (
            <Route path="/test/:idSectiune/:idCourse" element={<Test />} />
          )}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
