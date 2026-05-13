const { default: mongoose } = require("mongoose");
const {
  default: CompanyProfile,
} = require("./lib/models/companyProfile-model");

async function seedDatabase() {
  try {
    const mongo_url = "";
    await mongoose.connect(mongo_url);
    await CompanyProfile.updateMany(
      { status: { $exists: false } },
      {
        $set: {
          status: "notApplied",
        },
      },
    );
    console.log("success");
  } catch (error) {
    console.log(error);
  }
}
seedDatabase();
