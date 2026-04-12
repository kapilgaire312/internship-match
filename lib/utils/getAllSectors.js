import dbConnect from "../dbConnect";
import Sector from "../models/sector-model";

export default async function getAllSectors() {
  try {
    await dbConnect();
    const allSectorsObject = await Sector.find({}).lean();
    const allSectors = allSectorsObject.map((item) => ({
      _id: item._id.toString(),
      name: item.name,
    }));
    return allSectors;
  } catch (error) {
    console.log(error);
    return [];
  }
}
