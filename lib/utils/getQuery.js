import Sector from "../models/sector-model";

export default async function getQuery(search) {
  //find the matching sectors
  const sectors = await Sector.find({
    name: { $regex: search, $options: "i" },
  });

  console.log("sectorsis", sectors);

  //find ids of matchinfg sectors
  const sectorIds = sectors.map((item) => item._id);

  //make query
  const query = {};
  query.$or = [
    { title: { $regex: search, $options: "i" } },
    { required_skills: { $regex: search, $options: "i" } }, //mongodb will compare each elements of the array aafai.
    { sector: { $in: sectorIds } },
  ];
  return query;
}
