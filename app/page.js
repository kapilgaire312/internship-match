import HomePage from "./student/home/page";
import checkUserAndRedirect from "@/lib/utils/checkUserAndRedirect";

export default async function Home() {
  await checkUserAndRedirect();
  return (
    <div>
      <HomePage />
    </div>
  );
}
