import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import ScrollToTop from "../components/ui/ScrollToTop";

// Public Pages (code-split)
const Home = lazy(() => import("../pages/public/Home"));
const About = lazy(() => import("../pages/public/About"));
const Projects = lazy(() => import("../pages/public/Projects"));
const ProjectDetails = lazy(() => import("../pages/public/ProjectDetails"));
const Skills = lazy(() => import("../pages/public/Skills"));
const Experience = lazy(() => import("../pages/public/Experience"));
const Certificates = lazy(() => import("../pages/public/Certificates"));
const Resume = lazy(() => import("../pages/public/Resume"));
const Contact = lazy(() => import("../pages/public/Contact"));
const NotFound = lazy(() => import("../pages/public/NotFound"));

// Admin Pages (code-split)
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const Login = lazy(() => import("../pages/admin/Login"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const AdminProjects = lazy(() => import("../pages/admin/Projects"));
const AdminSkills = lazy(() => import("../pages/admin/Skills"));
const AdminCertificates = lazy(() => import("../pages/admin/Certificates"));
const AdminExperience = lazy(() => import("../pages/admin/Experience"));
const Education = lazy(() => import("../pages/admin/Education"));
const Messages = lazy(() => import("../pages/admin/Messages"));
const AdminResume = lazy(() => import("../pages/admin/Resume"));
const Settings = lazy(() => import("../pages/admin/Settings"));
const Profile = lazy(() => import("../pages/admin/Profile"));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-black">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-blue-500" />
    </div>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
