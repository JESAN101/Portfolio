import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";

// Public Pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Projects from "../pages/public/Projects";
import ProjectDetails from "../pages/public/ProjectDetails";
import Skills from "../pages/public/Skills";
import Experience from "../pages/public/Experience";
import Certificates from "../pages/public/Certificates";
import Resume from "../pages/public/Resume";
import Contact from "../pages/public/Contact";
import NotFound from "../pages/public/NotFound";

// Admin Pages
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import AdminProjects from "../pages/admin/Projects";
import AdminSkills from "../pages/admin/Skills";
import AdminCertificates from "../pages/admin/Certificates";
import AdminExperience from "../pages/admin/Experience";
import Education from "../pages/admin/Education";
import Messages from "../pages/admin/Messages";
import AdminResume from "../pages/admin/Resume";
import Settings from "../pages/admin/Settings";
import Profile from "../pages/admin/Profile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="certificates" element={<AdminCertificates />} />
          <Route path="experience" element={<AdminExperience />} />
          <Route path="education" element={<Education />} />
          <Route path="messages" element={<Messages />} />
          <Route path="resume" element={<AdminResume />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;