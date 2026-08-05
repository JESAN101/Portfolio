# Portfolio CMS - Project Requirements Document (PRD)

## Project Overview

### Project Name
Portfolio CMS (Working Title)

### Description
Portfolio CMS is a premium full-stack web application designed to showcase my skills, projects, experience, and achievements while providing a secure admin dashboard to manage all content dynamically.

The project is built to demonstrate professional MERN Stack development skills, modern UI/UX principles, scalable architecture, and production-ready coding practices.

---

# Objectives

## Primary Goals

- Build a premium portfolio website.
- Develop a complete Content Management System (CMS).
- Manage portfolio content without modifying code.
- Showcase professional full-stack development skills.
- Deliver excellent UI/UX.
- Support Light & Dark Mode.
- Ensure full responsiveness.
- Deploy to production.

---

# Target Users

## Public Visitor

Can:

- View portfolio
- Browse projects
- View certificates
- Read experience
- Download resume
- Send contact messages

Cannot:

- Access admin area
- Modify content

---

## Admin

Can:

- Login securely
- Manage projects
- Manage skills
- Manage certificates
- Manage experience
- Manage education
- Upload resume
- Upload images
- Manage website settings
- Read contact messages

---

# Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS v4
- React Router DOM
- Framer Motion
- Axios
- React Icons

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Multer
- Cloudinary
- Helmet
- CORS
- Express Rate Limit
- Morgan
- Cookie Parser

---

## Deployment

Frontend:
- Vercel

Backend:
- Render

Database:
- MongoDB Atlas

Image Storage:
- Cloudinary

---

# Website Pages

## Public Pages

- Home
- About
- Projects
- Project Details
- Skills
- Experience
- Certificates
- Contact
- Resume
- 404

---

## Admin Pages

- Login
- Dashboard
- Projects
- Skills
- Certificates
- Experience
- Education
- Messages
- Resume
- Settings
- Profile

---

# Homepage Sections

1. Hero
2. About Preview
3. Featured Projects
4. Skills Preview
5. Experience Timeline
6. Certificates Preview
7. Contact CTA
8. Footer

---

# Admin Dashboard Modules

## Dashboard

- Statistics
- Recent Messages
- Quick Actions
- Latest Updates

---

## Projects

CRUD Operations

Fields:

- Title
- Slug
- Short Description
- Full Description
- Tech Stack
- GitHub URL
- Live Demo URL
- Thumbnail
- Gallery Images
- Featured
- Category
- Status
- Display Order

---

## Skills

CRUD Operations

Fields:

- Skill Name
- Category
- Icon
- Color
- Display Order

---

## Certificates

CRUD Operations

Fields:

- Certificate Name
- Organization
- Issue Date
- Credential Link
- Image
- Description

---

## Experience

CRUD Operations

Fields:

- Company
- Position
- Duration
- Description
- Technologies Used

---

## Education

CRUD Operations

Fields:

- Institution
- Degree
- Duration
- GPA (Optional)
- Description

---

## Resume

- Upload Resume
- Replace Resume

---

## Contact Messages

Store

- Name
- Email
- Subject
- Message
- Date
- Read Status

---

## Settings

Manage

- Website Name
- Logo
- Favicon
- Social Links
- Contact Information
- SEO Settings
- Theme Preferences

---

# Theme System

Support

- Light Theme
- Dark Theme

Features

- Theme Toggle
- Persistent Theme (Local Storage)
- Smooth Theme Transition
- Theme Support for Public Website
- Theme Support for Admin Dashboard

---

# Authentication

- JWT Authentication
- Secure Login
- Protected Routes
- Password Hashing
- Secure Cookies (Production)

---

# Database Collections

- admins
- projects
- skills
- certificates
- experiences
- education
- messages
- settings

---

# Folder Structure

portfolio/

├── client/
│
├── server/
│
└── README.md

---

# Frontend Architecture

- Pages
- Components
- Layouts
- Hooks
- Context
- Services
- Constants
- Utilities
- Data
- Assets

---

# Design Principles

- Premium UI
- Modern Design
- Minimal Layout
- Smooth Animations
- Accessible
- Responsive
- Reusable Components
- Scalable Architecture
- Clean Code
- Performance Optimized

---

# Features

## Public Website

- Responsive Navigation
- Hero Section
- About Section
- Projects Showcase
- Project Detail Pages
- Skills Section
- Experience Timeline
- Certificates Gallery
- Resume Download
- Contact Form
- Light/Dark Theme
- Smooth Animations

---

## Admin Dashboard

- Secure Authentication
- Dashboard Overview
- Project Management
- Skills Management
- Certificate Management
- Experience Management
- Education Management
- Resume Management
- Contact Message Management
- Website Settings
- Profile Management
- Light/Dark Theme

---

# Future Enhancements

- Blog System
- Visitor Analytics
- Search
- Newsletter
- Testimonials
- Multi-language Support
- AI Assistant
- Command Palette (Ctrl + K)
- PWA Support
- Email Notifications
- Activity Logs

---

# Development Roadmap

## Phase 1

- Project Setup
- Design System
- Routing
- Layout

---

## Phase 2

- Public Website

---

## Phase 3

- Backend API

---

## Phase 4

- Admin Dashboard

---

## Phase 5

- API Integration

---

## Phase 6

- Testing
- Performance Optimization
- SEO
- Accessibility

---

## Phase 7

- Deployment
- Documentation
- Final Review

---

# Success Criteria

The project will be considered complete when:

- All portfolio content is managed through the CMS.
- Public website is fully responsive.
- Light/Dark theme works flawlessly.
- Admin dashboard supports full CRUD functionality.
- Authentication is secure.
- Performance is optimized.
- SEO fundamentals are implemented.
- Project is deployed successfully.
- Code follows clean architecture and best practices.