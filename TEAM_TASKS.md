# LST App - Team Task Assignments (ClickUp Format)

## Project Overview
**Project Name:** Let's Talk (LST) - Social Discussion Platform  
**Timeline:** 5 Weeks  
**Goal:** Build a real-time social discussion platform with live topics, global rooms, threaded conversations, and modern UI/UX

---

## Team Members & Responsibilities

| ID | Name | Role | Primary Focus |
|----|------|------|---------------|
| 1 | Gyan Appiah-Twene | Project Manager | Timeline & Scope Management |
| 2 | Eugene, Sie Kofi | UI/UX Designer | Visual Language & "Glass" System |
| 3 | Asamoah David | UI/UX Designer | Component Prototyping |
| 4 | Ampofo Kwadwo Boateng | Frontend Dev | Topic & Room Interfaces |
| 5 | Quarcoo Daniel Derek Nii Kwei | Frontend Dev | Messaging & Thread Logic |
| 6 | David Agbebo | Frontend Dev | Responsive Layouts |
| 7 | Yaa Lartebea Lartey | Frontend Dev | Profile & Settings Modules |
| 8 | Benjamin Ettey | Full Stack | API & Data Integration |
| 9 | Asare Kwaku Boadu Lancelot | Backend Dev | Server Logic & Database |
| 10 | Owusu John | QC / Tester | Usability Testing |
| 11 | Dzukey Prince Ofori | QC / Tester | Performance Testing |

---

## Master Task List (ClickUp Format)

### [LST-PM] Project Management
- **LST-PM-001: Establish 5-Week Milestone Tracking**
  - Establish milestones for Week 1 (Foundation) through Week 5 (Polish).
- **LST-PM-002: Risk Management: Performance & Design**
  - Monitor technical risks related to "Midnight Glass" UI effects and PWA compatibility.
- **LST-PM-003: Final Documentation & Handover Prep**
  - Final project manual, API docs, and deployment guides.

### [LST-DS] UI/UX Design
- **LST-DS-001: Core 'Midnight Glass' UI Kit Specification**
  - Define variables for blur, transparency, and deep dark palette (#020617).
- **LST-DS-002: PWA App Icons & Branding Assets**
  - Generate masked icons and splash screen assets.
- **LST-DS-003: Design Audit: Component Implementation**
  - Review implemented components for blur consistency and legibility.
- **LST-DS-004: Message Bubble & Thread Prototyping**
  - Design states for text, media, and GIF messages with thread connectors.
- **LST-DS-005: Responsive Layout Matrix: Mobile vs PC**
  - Define transformation logic from mobile views to desktop sidebar layouts.
- **LST-DS-006: Micro-animation Spec: Sparkles & Hearts**
  - Define interactive feedback animations for sparks and hearts.

### [LST-FE] Frontend Development
- **LST-FE-001: Topic Card Component (Global/Trending)**
  - Component with category pills, live timers, and participant counts.
- **LST-FE-002: Explore Screen: Category Horizontal Scroller**
  - Horizontal pill selector with snap-to-scroll and active states.
- **LST-FE-003: Topic Room Detail Header (Global Room)**
  - Top app bar with back navigation and centered topic bold title.
- **LST-FE-004: Share Topic Modal Sheet**
  - Bottom-sheet with Topic Summary, Copy Link, and QR code placeholders.
- **LST-FE-005: Message Bubble Component (Global & Mini-Thread)**
  - Reusable bubble with avatars, timestamps, and thread action footers.
- **LST-FE-006: Thread Tree Indentation Logic**
  - Recursive rendering logic for nested replies with connector lines.
- **LST-FE-007: Global Chat Input Bar**
  - Bottom input bar with context labels and auto-resizing text fields.
- **LST-FE-008: Empty State: Your Threads**
  - Empty state view with 💬 placeholder and Explore CTA.
- **LST-FE-009: Main Application Shell & Responsive Grid**
  - Outer shell with Bottom Nav (Mobile) and Grid Sidebar (Desktop).
- **LST-FE-010: Bottom Navigation Bar (Mobile)**
  - Persistent 5-icon nav with active state styling.
- **LST-FE-011: Desktop Sidebar Menu**
  - PC layout sidebar with 240px width and route matching.
- **LST-FE-012: Loading & Splash Screen**
  - Initial splash with pulsing logo and auto-fade.
- **LST-FE-013: User Profile View**
  - Profile screen with large avatar, stats bar, and logout action.
- **LST-FE-014: Notifications Center**
  - Feed grouped by time with color-coded context icons.
- **LST-FE-015: Preferences & Settings System**
  - Toggle switch components for theme and notification settings.

### [LST-FS] Full Stack & Integration
- **LST-FS-001: Vite React + Tailwind Project Initialization**
  - Frontend dir setup with Vite, Tailwind (Midnight palette), and Zustand.
- **LST-FS-002: Node/Express Server Initialization**
  - Backend dir setup with Express, Mongoose, and Socket.io.
- **LST-FS-003: API Routes: Topics & Rooms**
  - REST endpoints for feeding frontend topics and room data.
- **LST-FS-004: Socket.io Client Integration**
  - Real-time connection between React and Node with optimistic updates.

### [LST-BE] Backend Development
- **LST-BE-001: MongoDB Schema Design: Topics & Timer Jobs**
  - Schema for topics with 27h TTL/Cron expiry logic.
- **LST-BE-002: MongoDB Schema Design: Messages & Threading**
  - Recursive parent-child message schema with embedded reactions.
- **LST-BE-003: Socket.io Chat Architecture**
  - Server-side logic for room joining and real-time broadcasting.

### [LST-QA] Quality Control & Testing
- **LST-QA-001: Mini-Thread Routing & UX Validation**
  - UX testing for threaded navigation and back-button persistence.
- **LST-QA-002: Real-time Messaging Functional Tests**
  - Functional tests for instant sync and typing indicators.
- **LST-QA-003: Accessibility & WCAG Compliance Audit**
  - Audit for contrast, keyboard nav, and ARIA labels.
- **LST-QA-004: Baseline Performance Audit (Core Web Vitals)**
  - Audit of FCP/LCP and blur performance.
- **LST-QA-005: Global Room Load Testing**
  - Simulation of 100+ concurrent connections for performance monitoring.

---
*Generated: 2026-03-09*  
*Project: Let's Talk (LST) - Social Discussion Platform*
