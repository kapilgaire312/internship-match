const mongoose = require("mongoose");
//const Internship = require("./lib/models/internship-model.js");
//const Sector = require("./lib/models/sector-model.js");
const { default: Internship } = require("./lib/models/internship-model.js");
const { default: Sector } = require("./lib/models/sector-model.js");

const MONGODB_URI = ""; // your connection string

const mapping = {
  "69dfbafa1181e1048da3aa13": "6a2fe7e5e2e0e23b86312a0f", // Software Development
  "69dfbafa1181e1048da3aa14": "6a2fe7e5e2e0e23b86312a10", // Web Development
  "69dfbafa1181e1048da3aa15": "6a2fe7e5e2e0e23b86312a11", // Mobile App Development
  "69dfbafa1181e1048da3aa16": "6a2fe7e5e2e0e23b86312a12", // Data Science
  "69dfbafa1181e1048da3aa17": "6a2fe7e5e2e0e23b86312a12", // Data Science
  "69dfbafa1181e1048da3aa19": "6a2fe7e5e2e0e23b86312a15", // Cybersecurity
  "69dfbafa1181e1048da3aa1b": "6a2fe7e5e2e0e23b86312a17", // DevOps
  "69dfbafa1181e1048da3aa1d": "6a2fe7e5e2e0e23b86312a1d", // Business Development
  "69dfbafa1181e1048da3aa1e": "6a2fe7e5e2e0e23b86312a1a", // Digital Marketing
  "69dfbafa1181e1048da3aa1f": "6a2fe7e5e2e0e23b86312a21", // Finance
  "69dfbafa1181e1048da3aa21": "6a2fe7e5e2e0e23b86312a0f", // Software Development
  "69dfbafa1181e1048da3aa22": "6a2fe7e5e2e0e23b86312a38", // Animation
  "69dfbafa1181e1048da3aa24": "6a2fe7e5e2e0e23b86312a31", // Electrical Engineering
  "69dfbafa1181e1048da3aa25": "6a2fe7e5e2e0e23b86312a13", // Artificial Intelligence
  "69dfbafa1181e1048da3aa29": "6a2fe7e5e2e0e23b86312a39", // E‑commerce
};

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB\n");
}

async function migrate() {
  const internships = await Internship.find();
  let updated = 0;

  for (const int of internships) {
    const original = [...int.sector];
    const newSectors = int.sector.map((id) => {
      const idStr = id.toString();
      return mapping[idStr] ? new mongoose.Types.ObjectId(mapping[idStr]) : id;
    });

    if (JSON.stringify(original) !== JSON.stringify(newSectors)) {
      int.sector = newSectors;
      await int.save();
      updated++;
    }
  }

  console.log(`✅ Updated ${updated} internship(s).`);
}

(async () => {
  await connectDB();
  await migrate();
  console.log("✨ Done.");
  await mongoose.disconnect();
  process.exit(0);
})().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
