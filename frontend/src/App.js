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
import AnalizaPerformanta from "./pages/mentor/AnalizaPerformanta.js";
import EditTestPage from "./pages/mentor/EditTestPage.js";

function App() {
  const [user, setUser] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter >
        {user && user.status === "junior" && <Sidebar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/profile"
            element={
              // <PrivateRoute>
              <Profile />
              // </PrivateRoute>
            }
          />
          <Route
            path="/course/:idCourse"
            element={
              // <PrivateRoute>
              <CoursePage />
              // </PrivateRoute>
            }
          />
          <Route
            path="/topics"
            element={
              <UserMarket />
            }
          />
          <Route
            path="/course-summary/:idCourse"
            element={
              // <PrivateRoute>
              <CourseSummary />
              // </PrivateRoute>
            }
          />
          <Route path="/edit-test/:id_test"
          element={<EditTestPage></EditTestPage>}>
          </Route>
          <Route
            path="/mentor-homepage"
            element={
              // <PrivateRoute>
              <MentorHomepage />
              // </PrivateRoute>
            }
          />{" "}
          <Route
            path="/mentor-homepage/:idCourse"
            element={
              // <PrivateRoute>
              <CourseStatus />
              // </PrivateRoute>
            }
          />
          <Route
            path="/performanta/:idCourse"
            element={
              // <PrivateRoute>
              <AnalizaPerformanta />
              // </PrivateRoute>
            }
          />
          <Route
            path="/new-course"
            element={
              // <PrivateRoute>
              <NewCourse />
              // </PrivateRoute>
            }
          />
          <Route
            path="/new-section/:idCourse"
            element={
              // <PrivateRoute>
              <NewSection />
              // </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              // <PrivateRoute>
              <AdminHomepage />
              // </PrivateRoute>
            }
          />
          <Route
            path="/requests/:idCourse"
            element={
              // <PrivateRoute>
              <Requests />
              // </PrivateRoute>
            }
          />
          <Route
            path="/feedback/:idCourse"
            element={
              // <PrivateRoute>
              <Feedback />
              // </PrivateRoute>
            }
          />
          <Route
            path="/test/:idSectiune/:idCourse"
            element={
              // <PrivateRoute>
              <Test />
              // </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
