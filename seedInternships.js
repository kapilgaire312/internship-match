import User from "./lib/models/user-model.js";
import CompanyProfile from "./lib/models/companyProfile-model.js";

import Internship from "./lib/models/internship-model.js";
import dbConnect from "./lib/dbConnect.js";

async function seed() {
  await dbConnect();
  // Clear old data
  await User.deleteMany({});
  await Internship.deleteMany({});
  await CompanyProfile.deleteMany({});

  // -----------------------------
  // Create Company Users
  // -----------------------------
  const companyUsers = await User.insertMany([
    {
      email: "hr@techverse.com",
      password: "123456",
      role: "company",
    },
    {
      email: "jobs@datasphere.com",
      password: "123456",
      role: "company",
    },
    {
      email: "careers@cloudnest.com",
      password: "123456",
      role: "company",
    },
  ]);

  // -----------------------------
  // Create Company Profiles
  // -----------------------------
  const companies = await CompanyProfile.insertMany([
    {
      company_id: companyUsers[0]._id,
      name: "TechVerse",
      logo: "/logos/techverse.png",
      website: ["https://techverse.com"],
    },
    {
      company_id: companyUsers[1]._id,
      name: "DataSphere",
      logo: "/logos/datasphere.png",
      website: ["https://datasphere.io"],
    },
    {
      company_id: companyUsers[2]._id,
      name: "CloudNest",
      logo: "/logos/cloudnest.png",
      website: ["https://cloudnest.dev"],
    },
  ]);

  // -----------------------------
  // Create Internships
  // -----------------------------
  const internships = [
    {
      title: "Frontend Developer Intern",
      company_id: companies[0]._id,
      company_name: "TechVerse",
      company_logo: "/logos/techverse.png",
      company_location: "Kathmandu",
      isRemote: true,
      intern_period: "3 Months",
      salary: 15000,
      sector: ["Frontend", "React"],
      required_skills: ["HTML", "CSS", "JavaScript", "React"],
      parsed_required_skills: ["html", "css", "javascript", "react"],
    },
    {
      title: "Backend Developer Intern",
      company_id: companies[0]._id,
      company_name: "TechVerse",
      company_logo: "/logos/techverse.png",
      company_location: "Kathmandu",
      isRemote: false,
      intern_period: "6 Months",
      salary: 20000,
      sector: ["Frontend", "Node"],
      required_skills: ["Node.js", "Express", "MongoDB"],
      parsed_required_skills: ["nodejs", "express", "mongodb"],
    },
    {
      title: "Full Stack Intern",
      company_id: companies[0]._id,
      company_name: "TechVerse",
      company_logo: "/logos/techverse.png",
      company_location: "Remote",
      isRemote: true,
      intern_period: "4 Months",
      salary: 18000,
      sector: ["Frontend"],
      required_skills: ["React", "Node.js", "MongoDB"],
      parsed_required_skills: ["react", "nodejs", "mongodb"],
    },
    {
      title: "Data Analyst Intern",
      company_id: companies[1]._id,
      company_name: "DataSphere",
      company_logo: "/logos/datasphere.png",
      company_location: "Lalitpur",
      isRemote: false,
      intern_period: "3 Months",
      salary: 17000,
      sector: ["Data"],
      required_skills: ["Python", "SQL", "Excel"],
      parsed_required_skills: ["python", "sql", "excel"],
    },
    {
      title: "Machine Learning Intern",
      company_id: companies[1]._id,
      company_name: "DataSphere",
      company_logo: "/logos/datasphere.png",
      company_location: "Remote",
      isRemote: true,
      intern_period: "6 Months",
      salary: 22000,
      sector: ["ML", "AI"],
      required_skills: ["Python", "TensorFlow", "Pandas"],
      parsed_required_skills: ["python", "tensorflow", "pandas"],
    },
    {
      title: "Business Intelligence Intern",
      company_id: companies[1]._id,
      company_name: "DataSphere",
      company_logo: "/logos/datasphere.png",
      company_location: "Kathmandu",
      isRemote: false,
      intern_period: "4 Months",
      salary: 16000,
      sector: ["Analytics"],
      required_skills: ["PowerBI", "SQL"],
      parsed_required_skills: ["powerbi", "sql"],
    },
    {
      title: "DevOps Intern",
      company_id: companies[2]._id,
      company_name: "CloudNest",
      company_logo: "/logos/cloudnest.png",
      company_location: "Remote",
      isRemote: true,
      intern_period: "5 Months",
      salary: 21000,
      sector: ["DevOps"],
      required_skills: ["Docker", "AWS", "Linux"],
      parsed_required_skills: ["docker", "aws", "linux"],
    },
    {
      title: "Cloud Engineer Intern",
      company_id: companies[2]._id,
      company_name: "CloudNest",
      company_logo: "/logos/cloudnest.png",
      company_location: "Bhaktapur",
      isRemote: false,
      intern_period: "6 Months",
      salary: 23000,
      sector: ["Cloud"],
      required_skills: ["AWS", "Terraform"],
      parsed_required_skills: ["aws", "terraform"],
    },
    {
      title: "Site Reliability Intern",
      company_id: companies[2]._id,
      company_name: "CloudNest",
      company_logo: "/logos/cloudnest.png",
      company_location: "Remote",
      isRemote: true,
      intern_period: "3 Months",
      salary: 20000,
      sector: ["SRE"],
      required_skills: ["Linux", "Kubernetes"],
      parsed_required_skills: ["linux", "kubernetes"],
    },
    {
      title: "Cybersecurity Intern",
      company_id: companies[2]._id,
      company_name: "CloudNest",
      company_logo: "/logos/cloudnest.png",
      company_location: "Kathmandu",
      isRemote: false,
      intern_period: "4 Months",
      salary: 19000,
      sector: ["Security"],
      required_skills: ["Networking", "Linux", "Security Basics"],
      parsed_required_skills: ["networking", "linux", "security"],
    },
  ];

  await Internship.insertMany(internships);

  console.log("Seed data inserted successfully");
  process.exit();
}

seed();
