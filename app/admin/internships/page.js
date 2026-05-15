import getInternships from "@/lib/utils/admin/getInternships";

export default async function InternshipsPage(search) {
  const internships = await getInternships(search);
  console.log(internships)
  return (<div>
    yoho
  </div>
  )
}