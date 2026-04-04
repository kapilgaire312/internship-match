import dbConnect from "./lib/dbConnect.js";
import bcrypt from "bcrypt";
import User from "./lib/models/user-model.js";
import CompanyProfile from "./lib/models/companyProfile-model.js";
import StudentProfile from "./lib/models/studentProfile-model.js";
import Internship from "./lib/models/internship-model.js";
import Application from "./lib/models/application-model.js";
import Sector from "./lib/models/sector-model.js";

export async function seedDatabase() {
  await dbConnect();

  console.log("🌱 Seeding database...");

  await Promise.all([
    User.deleteMany({}),
    CompanyProfile.deleteMany({}),
    StudentProfile.deleteMany({}),
    Internship.deleteMany({}),
    Application.deleteMany({}),
    Sector.deleteMany({}),
  ]);

  // ---------------- SECTORS (25) ----------------
  const sectors = await Sector.insertMany([
    { name: "Software Development" },
    { name: "Web Development" },
    { name: "Mobile Development" },
    { name: "Data Science" },
    { name: "Machine Learning" },
    { name: "Artificial Intelligence" },
    { name: "Cybersecurity" },
    { name: "Cloud Computing" },
    { name: "DevOps" },
    { name: "UI/UX Design" },
    { name: "Product Management" },
    { name: "Digital Marketing" },
    { name: "Finance" },
    { name: "Business Analytics" },
    { name: "Blockchain" },
    { name: "Game Development" },
    { name: "Networking" },
    { name: "Embedded Systems" },
    { name: "Robotics" },
    { name: "QA / Testing" },
    { name: "Big Data" },
    { name: "AR/VR" },
    { name: "E-commerce" },
    { name: "EdTech" },
    { name: "HealthTech" },
  ]);

  // ---------------- USERS ----------------
  // ---------------- USERS (with hashed passwords) ----------------
  const plainPassword = "12345678";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const users = await User.insertMany([
    { email: "hr@google.com", password: hashedPassword, role: "company" },
    { email: "jobs@microsoft.com", password: hashedPassword, role: "company" },
    { email: "careers@amazon.com", password: hashedPassword, role: "company" },
    { email: "hr@spotify.com", password: hashedPassword, role: "company" },
    { email: "hr@tesla.com", password: hashedPassword, role: "company" },

    { email: "alice@gmail.com", password: hashedPassword, role: "student" },
    { email: "bob@gmail.com", password: hashedPassword, role: "student" },
    { email: "charlie@gmail.com", password: hashedPassword, role: "student" },
    { email: "david@gmail.com", password: hashedPassword, role: "student" },
  ]); // ---------------- COMPANIES ----------------
  const companies = await CompanyProfile.insertMany([
    {
      company_id: users[0]._id,
      name: "Google",
      logo: "https://logo.clearbit.com/google.com",
      website: ["https://google.com"],
      industry: "Technology",
    },
    {
      company_id: users[1]._id,
      name: "Microsoft",
      logo: "https://logo.clearbit.com/microsoft.com",
      website: ["https://microsoft.com"],
      industry: "Technology",
    },
    {
      company_id: users[2]._id,
      name: "Amazon",
      logo: "https://logo.clearbit.com/amazon.com",
      website: ["https://amazon.com"],
      industry: "E-commerce",
    },
    {
      company_id: users[3]._id,
      name: "Spotify",
      logo: "https://logo.clearbit.com/spotify.com",
      website: ["https://spotify.com"],
      industry: "Music",
    },
    {
      company_id: users[4]._id,
      name: "Tesla",
      logo: "https://logo.clearbit.com/tesla.com",
      website: ["https://tesla.com"],
      industry: "Automotive",
    },
  ]);

  // ---------------- STUDENTS ----------------
  const students = await StudentProfile.insertMany([
    {
      student_id: users[5]._id,
      name: "Alice Johnson",
      university: "Stanford University",
      skills: ["JavaScript", "React"],
      parsed_skills: ["javascript", "react", "node.js", "rest apis", "git"],
      sector: [sectors[1]._id, sectors[0]._id, sectors[2]._id], // Web Dev, Software Dev, Mobile Dev
    },
    {
      student_id: users[6]._id,
      name: "Bob Smith",
      university: "MIT",
      skills: ["Python"],
      parsed_skills: ["python", "machine learning", "tensorflow", "pandas"],
      sector: [sectors[4]._id, sectors[3]._id, sectors[5]._id], // Machine Learning, Data Science, AI
    },
    {
      student_id: users[7]._id,
      name: "Charlie Brown",
      university: "UC Berkeley",
      skills: ["Networking"],
      parsed_skills: ["networking", "cybersecurity", "linux", "wireshark"],
      sector: [sectors[6]._id, sectors[16]._id], // Cybersecurity, Networking
    },
    {
      student_id: users[8]._id,
      name: "David Lee",
      university: "Harvard",
      skills: ["Finance"],
      parsed_skills: ["finance", "excel", "sql", "analytics"],
      sector: [sectors[12]._id, sectors[13]._id, sectors[3]._id], // Finance, Business Analytics, Data Science
    },
  ]);

  // ---------------- BUILDER FUNCTIONS (separate fields) ----------------
  const buildJobDescription = (role) => `
We are looking for an enthusiastic ${role} Intern to join our team.
You will work on real-world projects and collaborate with experienced engineers.
This role offers hands-on exposure to production systems and scalable architectures.
`;

  const buildEligibility = () => `
Final-year students or recent graduates in a relevant field.
Strong fundamentals and willingness to learn are required.
Prior project experience is a plus.
`;

  const buildResponsibilities = () => `
Collaborate with cross-functional teams to build features.
Write clean, maintainable, and efficient code.
Debug, test, and optimize applications.
Participate in code reviews and technical discussions.
Continuously learn and apply new technologies.
`;

  // ---------------- INTERNSHIPS (25 TOTAL) ----------------
  const internships = await Internship.insertMany([
    // ----- 1. Frontend Developer Intern (Google) -----
    {
      title: "Frontend Developer Intern",
      company_id: companies[0]._id,
      company_name: "Google",
      company_logo: companies[0].logo,
      company_location: "USA",
      type: "remote",
      salary: 2000,
      sector: [sectors[1]._id],
      required_skills: ["React"],
      parsed_required_skills: [
        { skill: "react", weight: 0.9 },
        { skill: "javascript", weight: 0.9 },
        { skill: "css", weight: 0.7 },
        { skill: "html", weight: 0.6 },
      ],
      job_description: buildJobDescription("Frontend Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Beginner",
      isClosed: true,
      application_date: new Date("2026-05-01"),
    },

    // ----- 2. Backend Developer Intern (Microsoft) -----
    {
      title: "Backend Developer Intern",
      company_id: companies[1]._id,
      company_name: "Microsoft",
      company_logo: companies[1].logo,
      company_location: "USA",
      type: "on-site",
      salary: 2600,
      sector: [sectors[0]._id],
      required_skills: ["Node.js"],
      parsed_required_skills: [
        { skill: "node.js", weight: 0.9 },
        { skill: "mongodb", weight: 0.85 },
        { skill: "rest apis", weight: 0.8 },
      ],
      job_description: buildJobDescription("Backend Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 4,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-05-15"),
    },

    // ----- 3. Machine Learning Intern (Google) -----
    {
      title: "Machine Learning Intern",
      company_id: companies[0]._id,
      company_name: "Google",
      company_logo: companies[0].logo,
      company_location: "Hybrid",
      type: "hybrid",
      salary: 3200,
      sector: [sectors[4]._id],
      required_skills: ["Python"],
      parsed_required_skills: [
        { skill: "python", weight: 0.95 },
        { skill: "tensorflow", weight: 0.9 },
        { skill: "deep learning", weight: 0.85 },
      ],
      job_description: buildJobDescription("Machine Learning"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-06-01"),
    },

    // ----- 4. Data Analyst Intern (Amazon) -----
    {
      title: "Data Analyst Intern",
      company_id: companies[2]._id,
      company_name: "Amazon",
      company_logo: companies[2].logo,
      company_location: "USA",
      type: "hybrid",
      salary: 2200,
      sector: [sectors[3]._id],
      required_skills: ["SQL"],
      parsed_required_skills: [
        { skill: "sql", weight: 0.95 },
        { skill: "excel", weight: 0.85 },
        { skill: "python", weight: 0.75 },
      ],
      job_description: buildJobDescription("Data Analyst"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 5,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-04-30"),
    },

    // ----- 5. DevOps Intern (Amazon) -----
    {
      title: "DevOps Intern",
      company_id: companies[2]._id,
      company_name: "Amazon",
      company_logo: companies[2].logo,
      company_location: "Remote",
      type: "remote",
      salary: 2700,
      sector: [sectors[8]._id],
      required_skills: ["AWS"],
      parsed_required_skills: [
        { skill: "aws", weight: 0.95 },
        { skill: "docker", weight: 0.9 },
        { skill: "ci/cd", weight: 0.85 },
      ],
      job_description: buildJobDescription("DevOps"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-05-20"),
    },

    // ----- 6. Cybersecurity Intern (Microsoft) -----
    {
      title: "Cybersecurity Intern",
      company_id: companies[1]._id,
      company_name: "Microsoft",
      company_logo: companies[1].logo,
      company_location: "Remote",
      type: "remote",
      salary: 2800,
      sector: [sectors[6]._id],
      required_skills: ["Security"],
      parsed_required_skills: [
        { skill: "network security", weight: 0.9 },
        { skill: "penetration testing", weight: 0.85 },
        { skill: "linux", weight: 0.8 },
      ],
      job_description: buildJobDescription("Cybersecurity"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-06-05"),
    },

    // ----- 7. Blockchain Intern (Amazon) -----
    {
      title: "Blockchain Intern",
      company_id: companies[2]._id,
      company_name: "Amazon",
      company_logo: companies[2].logo,
      company_location: "Remote",
      type: "remote",
      salary: 3000,
      sector: [sectors[14]._id],
      required_skills: ["Solidity"],
      parsed_required_skills: [
        { skill: "solidity", weight: 0.95 },
        { skill: "ethereum", weight: 0.9 },
        { skill: "smart contracts", weight: 0.85 },
      ],
      job_description: buildJobDescription("Blockchain"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Experienced",
      isClosed: false,
      application_date: new Date("2026-06-15"),
    },

    // ----- 8. UI/UX Designer Intern (Spotify) -----
    {
      title: "UI/UX Designer Intern",
      company_id: companies[3]._id,
      company_name: "Spotify",
      company_logo: companies[3].logo,
      company_location: "Sweden",
      type: "hybrid",
      salary: 1800,
      sector: [sectors[9]._id],
      required_skills: ["Figma"],
      parsed_required_skills: [
        { skill: "figma", weight: 0.9 },
        { skill: "user research", weight: 0.8 },
        { skill: "wireframing", weight: 0.75 },
      ],
      job_description: buildJobDescription("UI/UX Designer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-04-25"),
    },

    // ----- 9. Embedded Systems Intern (Tesla) -----
    {
      title: "Embedded Systems Intern",
      company_id: companies[4]._id,
      company_name: "Tesla",
      company_logo: companies[4].logo,
      company_location: "USA",
      type: "on-site",
      salary: 3300,
      sector: [sectors[17]._id],
      required_skills: ["C++"],
      parsed_required_skills: [
        { skill: "c++", weight: 0.95 },
        { skill: "embedded c", weight: 0.9 },
        { skill: "microcontrollers", weight: 0.85 },
      ],
      job_description: buildJobDescription("Embedded Systems"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Experienced",
      isClosed: false,
      application_date: new Date("2026-06-30"),
    },

    // ----- 10. Cloud Engineer Intern (Microsoft) -----
    {
      title: "Cloud Engineer Intern",
      company_id: companies[1]._id,
      company_name: "Microsoft",
      company_logo: companies[1].logo,
      company_location: "USA",
      type: "hybrid",
      salary: 2900,
      sector: [sectors[7]._id],
      required_skills: ["Azure"],
      parsed_required_skills: [
        { skill: "azure", weight: 0.95 },
        { skill: "cloud architecture", weight: 0.85 },
        { skill: "kubernetes", weight: 0.8 },
      ],
      job_description: buildJobDescription("Cloud Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-06-10"),
    },

    // ----- 11. QA Engineer Intern (Google) -----
    {
      title: "QA Engineer Intern",
      company_id: companies[0]._id,
      company_name: "Google",
      company_logo: companies[0].logo,
      company_location: "Remote",
      type: "remote",
      salary: 1900,
      sector: [sectors[19]._id],
      required_skills: ["Testing"],
      parsed_required_skills: [
        { skill: "manual testing", weight: 0.9 },
        { skill: "automation testing", weight: 0.8 },
        { skill: "selenium", weight: 0.75 },
      ],
      job_description: buildJobDescription("QA Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 4,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-05-25"),
    },

    // ----- 12. Mobile Developer Intern (Spotify) -----
    {
      title: "Mobile Developer Intern",
      company_id: companies[3]._id,
      company_name: "Spotify",
      company_logo: companies[3].logo,
      company_location: "Sweden",
      type: "hybrid",
      salary: 2100,
      sector: [sectors[2]._id],
      required_skills: ["Kotlin"],
      parsed_required_skills: [
        { skill: "kotlin", weight: 0.9 },
        { skill: "android sdk", weight: 0.85 },
        { skill: "jetpack compose", weight: 0.75 },
      ],
      job_description: buildJobDescription("Mobile Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-06-18"),
    },

    // ----- 13. Product Manager Intern (Amazon) -----
    {
      title: "Product Manager Intern",
      company_id: companies[2]._id,
      company_name: "Amazon",
      company_logo: companies[2].logo,
      company_location: "USA",
      type: "on-site",
      salary: 2500,
      sector: [sectors[10]._id],
      required_skills: ["Communication"],
      parsed_required_skills: [
        { skill: "market research", weight: 0.9 },
        { skill: "roadmapping", weight: 0.85 },
        { skill: "agile", weight: 0.8 },
      ],
      job_description: buildJobDescription("Product Manager"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-06-22"),
    },

    // ----- 14. Digital Marketing Intern (Spotify) -----
    {
      title: "Digital Marketing Intern",
      company_id: companies[3]._id,
      company_name: "Spotify",
      company_logo: companies[3].logo,
      company_location: "Remote",
      type: "remote",
      salary: 1700,
      sector: [sectors[11]._id],
      required_skills: ["SEO"],
      parsed_required_skills: [
        { skill: "seo", weight: 0.9 },
        { skill: "content marketing", weight: 0.8 },
        { skill: "google analytics", weight: 0.75 },
      ],
      job_description: buildJobDescription("Digital Marketing"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-05-28"),
    },

    // ----- 15. Finance Analyst Intern (Tesla) -----
    {
      title: "Finance Analyst Intern",
      company_id: companies[4]._id,
      company_name: "Tesla",
      company_logo: companies[4].logo,
      company_location: "USA",
      type: "on-site",
      salary: 2300,
      sector: [sectors[12]._id],
      required_skills: ["Excel"],
      parsed_required_skills: [
        { skill: "excel", weight: 0.95 },
        { skill: "financial modeling", weight: 0.9 },
        { skill: "vba", weight: 0.7 },
      ],
      job_description: buildJobDescription("Finance Analyst"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-06-25"),
    },

    // ----- 16. Game Developer Intern (Google) -----
    {
      title: "Game Developer Intern",
      company_id: companies[0]._id,
      company_name: "Google",
      company_logo: companies[0].logo,
      company_location: "USA",
      type: "hybrid",
      salary: 2400,
      sector: [sectors[15]._id],
      required_skills: ["Unity"],
      parsed_required_skills: [
        { skill: "unity", weight: 0.9 },
        { skill: "c#", weight: 0.85 },
        { skill: "game physics", weight: 0.75 },
      ],
      job_description: buildJobDescription("Game Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-06-28"),
    },

    // ----- 17. Network Engineer Intern (Microsoft) -----
    {
      title: "Network Engineer Intern",
      company_id: companies[1]._id,
      company_name: "Microsoft",
      company_logo: companies[1].logo,
      company_location: "USA",
      type: "on-site",
      salary: 2600,
      sector: [sectors[16]._id],
      required_skills: ["Cisco"],
      parsed_required_skills: [
        { skill: "cisco", weight: 0.9 },
        { skill: "routing protocols", weight: 0.85 },
        { skill: "network security", weight: 0.8 },
      ],
      job_description: buildJobDescription("Network Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-07-02"),
    },

    // ----- 18. Robotics Intern (Tesla) -----
    {
      title: "Robotics Intern",
      company_id: companies[4]._id,
      company_name: "Tesla",
      company_logo: companies[4].logo,
      company_location: "USA",
      type: "on-site",
      salary: 3100,
      sector: [sectors[18]._id],
      required_skills: ["ROS"],
      parsed_required_skills: [
        { skill: "ros", weight: 0.9 },
        { skill: "python", weight: 0.85 },
        { skill: "control systems", weight: 0.8 },
      ],
      job_description: buildJobDescription("Robotics"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Experienced",
      isClosed: false,
      application_date: new Date("2026-07-05"),
    },

    // ----- 19. Big Data Engineer Intern (Amazon) -----
    {
      title: "Big Data Engineer Intern",
      company_id: companies[2]._id,
      company_name: "Amazon",
      company_logo: companies[2].logo,
      company_location: "USA",
      type: "hybrid",
      salary: 2800,
      sector: [sectors[20]._id],
      required_skills: ["Spark"],
      parsed_required_skills: [
        { skill: "apache spark", weight: 0.9 },
        { skill: "hadoop", weight: 0.85 },
        { skill: "scala", weight: 0.75 },
      ],
      job_description: buildJobDescription("Big Data Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-07-08"),
    },

    // ----- 20. AR/VR Developer Intern (Google) -----
    {
      title: "AR/VR Developer Intern",
      company_id: companies[0]._id,
      company_name: "Google",
      company_logo: companies[0].logo,
      company_location: "Hybrid",
      type: "hybrid",
      salary: 3000,
      sector: [sectors[21]._id],
      required_skills: ["Unity"],
      parsed_required_skills: [
        { skill: "unity", weight: 0.9 },
        { skill: "c#", weight: 0.85 },
        { skill: "ar foundation", weight: 0.8 },
      ],
      job_description: buildJobDescription("AR/VR Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Experienced",
      isClosed: false,
      application_date: new Date("2026-07-12"),
    },

    // ----- 21. E-commerce Analyst Intern (Amazon) -----
    {
      title: "E-commerce Analyst Intern",
      company_id: companies[2]._id,
      company_name: "Amazon",
      company_logo: companies[2].logo,
      company_location: "Remote",
      type: "remote",
      salary: 2100,
      sector: [sectors[22]._id],
      required_skills: ["Excel"],
      parsed_required_skills: [
        { skill: "excel", weight: 0.9 },
        { skill: "data analysis", weight: 0.85 },
        { skill: "sql", weight: 0.8 },
      ],
      job_description: buildJobDescription("E-commerce Analyst"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 4,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-07-15"),
    },

    // ----- 22. EdTech Intern (Microsoft) -----
    {
      title: "EdTech Intern",
      company_id: companies[1]._id,
      company_name: "Microsoft",
      company_logo: companies[1].logo,
      company_location: "USA",
      type: "hybrid",
      salary: 2200,
      sector: [sectors[23]._id],
      required_skills: ["Teaching"],
      parsed_required_skills: [
        { skill: "curriculum design", weight: 0.9 },
        { skill: "educational technology", weight: 0.85 },
        { skill: "data analysis", weight: 0.7 },
      ],
      job_description: buildJobDescription("EdTech"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-07-18"),
    },

    // ----- 23. HealthTech Intern (Tesla) -----
    {
      title: "HealthTech Intern",
      company_id: companies[4]._id,
      company_name: "Tesla",
      company_logo: companies[4].logo,
      company_location: "USA",
      type: "on-site",
      salary: 2700,
      sector: [sectors[24]._id],
      required_skills: ["Biomedical"],
      parsed_required_skills: [
        { skill: "biomedical engineering", weight: 0.9 },
        { skill: "data analysis", weight: 0.8 },
        { skill: "python", weight: 0.75 },
      ],
      job_description: buildJobDescription("HealthTech"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-07-22"),
    },

    // ----- 24. AI Research Intern (Google) -----
    {
      title: "AI Research Intern",
      company_id: companies[0]._id,
      company_name: "Google",
      company_logo: companies[0].logo,
      company_location: "USA",
      type: "hybrid",
      salary: 3400,
      sector: [sectors[5]._id],
      required_skills: ["Python"],
      parsed_required_skills: [
        { skill: "python", weight: 0.95 },
        { skill: "pytorch", weight: 0.9 },
        { skill: "research", weight: 0.85 },
      ],
      job_description: buildJobDescription("AI Research"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 1,
      level: "Experienced",
      isClosed: false,
      application_date: new Date("2026-07-25"),
    },

    // ----- 25. Full Stack Developer Intern (Microsoft) -----
    {
      title: "Full Stack Developer Intern",
      company_id: companies[1]._id,
      company_name: "Microsoft",
      company_logo: companies[1].logo,
      company_location: "USA",
      type: "on-site",
      salary: 2900,
      sector: [sectors[0]._id, sectors[1]._id],
      required_skills: ["JavaScript"],
      parsed_required_skills: [
        { skill: "javascript", weight: 0.9 },
        { skill: "node.js", weight: 0.85 },
        { skill: "react", weight: 0.8 },
        { skill: "mongodb", weight: 0.75 },
      ],
      job_description: buildJobDescription("Full Stack Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-07-30"),
    },
  ]);

  // ---------------- APPLICATIONS ----------------
  await Application.insertMany([
    {
      student_id: students[0]._id,
      internship_id: internships[0]._id,
      match_score: 88,
      status: "pending",
    },
    {
      student_id: students[1]._id,
      internship_id: internships[1]._id,
      match_score: 92,
      status: "approved",
    },
    {
      student_id: students[2]._id,
      internship_id: internships[2]._id,
      match_score: 75,
      status: "rejected",
    },
    // add a few more for realism
    {
      student_id: students[3]._id,
      internship_id: internships[3]._id,
      match_score: 81,
      status: "pending",
    },
    {
      student_id: students[0]._id,
      internship_id: internships[4]._id,
      match_score: 70,
      status: "pending",
    },
  ]);

  console.log("✅ Seeding complete!");
}
seedDatabase();
