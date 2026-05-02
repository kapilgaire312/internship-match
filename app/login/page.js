import Link from "next/link";
import LoginForm from "./LoginForm";
import checkUserAndRedirect from "@/lib/utils/checkUserAndRedirect";

export default async function Login() {
  await checkUserAndRedirect();
  return (
    <div className="flex h-[70vh] justify-center items-center align-middle ">
      <div className=" p-4 rounded-xl text-center bg-white sm:w-[30vw] sm:h-[50vh]">
        <div className="text-3xl font-semibold">Welcome Back</div>
        <div className="text-left mt-6 pl-5">
          <LoginForm />
        </div>
        <div>
          <p className=" mt-4">
            Don&apos;t have an account? Register as
            <span className="text-blue-700 block">
              {" "}
              <Link className="underline" href={"/register/student"}>
                Student
              </Link>{" "}
              <span> / </span>
              <Link className="underline" href={"/register/company"}>
                Company
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
