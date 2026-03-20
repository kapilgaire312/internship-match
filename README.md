# AI-Based Internship Matching System

An **AI-powered web platform** that connects students with companies offering internships. The system analyzes student resumes and internship descriptions to automatically match candidates with relevant opportunities using AI and a skill-matching algorithm.

## Overview

Finding internships that match a student's skills can be difficult and time-consuming. This project aims to simplify the process by using **AI-based skill extraction** and an automated **matching algorithm**.

Students upload their resumes or add their skills, and companies post internship descriptions. The system then extracts key skills from both sides and calculates a **match score** to recommend the most relevant internships to students.

##Folder Structure
**Descriptions**

- **`@/actions`** – Contains server actions used for handling backend logic like database operations and API interactions.
- **`@/lib/models`** – Database schema and models used for storing application data.
- **`@/lib/utils`** – Helper functions restricted to server-side usage.
- **`@/utils`** – Utility functions that can be shared between the client and server.
- **`@/components`** – Reusable UI components used across the application.
