# SkillShell

"Know the value before you invest the time."

## Overview

SkillShell is a web platform designed for engineering students preparing for placements. It helps students understand which free certification courses genuinely strengthen a resume for a specific role and identifies skill gaps that certifications or projects could close. Additionally, it provides a live daily digest of hackathons, internships, and opportunity deadlines.

## Core Features

- **Daily Digest**: A live feed of hackathons, deadlines, certifications, and events.
- **Certifications Directory**: Role-based, ranked directory of free certifications scored by issuer credibility and skill relevance.
- **Resume Analyser**: Upload a resume and select a target role to get an analysis of current skills, detect gaps against the role's required skill vector, and receive recommendations for certifications and portfolio projects.
- **Standard Resumes**: Benchmark reference resumes per supported role.
- **Free & Exclusive Resources**: Accessible resource content for logged-in users, with a premium tier for exclusive content.

## Tech Stack

This project is built using the MERN stack:
- **MongoDB**
- **Express.js**
- **React**
- **Node.js**

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd EDVC_Venture
   ```

2. Install client dependencies:
   ```bash
   cd client
   npm install
   ```

3. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

### Running the Application

1. Start the server (from the `server` directory):
   ```bash
   npm run dev
   ```

2. Start the client (from the `client` directory):
   ```bash
   npm start
   ```

## Documentation

Further details about the project requirements, architecture, and design can be found in the accompanying markdown files:
- `01_PRD.md`: Product Requirements Document
- `02_TRD.md`: Technical Requirements Document
- `05_Backend_Schema.md`: Backend Schema Details
- `rampay_design_system.md`: Design System Guidelines
