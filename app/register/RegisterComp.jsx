import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterComp({ role }) {
  return (
    <div className="flex h-[80vh] justify-center items-center align-middle ">
      <div className=" p-4 rounded-xl text-center bg-white sm:w-[30vw] sm:h-[70vh]">
        <div className="text-3xl font-semibold">Create an Account</div>
        <div className="text-left mt-6 pl-5">
          <RegisterForm role={role} />
        </div>
        <div>
          <p className=" mt-4">
            Already have an account?{" "}
            <span className="text-blue-700 block">
              {" "}
              <Link className="underline" href={"/login"}>
                Login here
              </Link>{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
