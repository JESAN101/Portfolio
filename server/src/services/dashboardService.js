import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";
import Education from "../models/Education.js";
import Certificate from "../models/Certificate.js";
import Message from "../models/Message.js";
import Profile from "../models/Profile.js";

export const getDashboardStatsService = async () => {
  const [
    projects,
    publishedProjects,
    featuredProjects,
    skills,
    activeSkills,
    experiences,
    activeExperiences,
    education,
    activeEducation,
    certificates,
    activeCertificates,
    messages,
    readMessages,
    unreadMessages,
    profileExists,
    recentMessages,
    recentProjects,
    categoryBreakdown,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ published: true }),
    Project.countDocuments({ featured: true }),
    Skill.countDocuments(),
    Skill.countDocuments({ isActive: true }),
    Experience.countDocuments(),
    Experience.countDocuments({ isActive: true }),
    Education.countDocuments(),
    Education.countDocuments({ isActive: true }),
    Certificate.countDocuments(),
    Certificate.countDocuments({ isActive: true }),
    Message.countDocuments(),
    Message.countDocuments({ read: true }),
    Message.countDocuments({ read: false }),
    Profile.exists(),
    Message.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email subject read createdAt"),
    Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title slug category featured published createdAt"),
    Project.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
  ]);

  return {
    counts: {
      projects,
      publishedProjects,
      featuredProjects,
      skills,
      activeSkills,
      experiences,
      activeExperiences,
      education,
      activeEducation,
      certificates,
      activeCertificates,
      messages,
      readMessages,
      unreadMessages,
    },
    profileExists: Boolean(profileExists),
    recentMessages,
    recentProjects,
    categoryBreakdown,
  };
};
