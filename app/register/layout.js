import checkUserAndRedirect from "@/lib/utils/checkUserAndRedirect";

export default async function RegisterLayout({ children }) {
  await checkUserAndRedirect();
  return <main>{children}</main>;
}
