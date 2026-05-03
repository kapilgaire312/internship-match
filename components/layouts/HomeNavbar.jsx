import Image from "next/image";
import Link from "next/link";
export default function HomeNavbar() {
  return (
    <nav className="sticky top-0 z-10 bg-[#f5f6fc] transition-all-300">
      {" "}
      <div className="flex justify-between py-5 px-8 select-none sticky items-center">
        <Link href="/" className="contents">
          {" "}
          <div className="relative w-54 h-13">
            <Image
              src="/InternKaji.webp"
              alt="logo"
              loading="eager"
              fill
              sizes="(min-width: 6 vw) 33vw"
            />
          </div>
        </Link>
        <div className="flex gap-9 text-">
          <div className="flex items-center">
            {" "}
            <Link className="contents" href="/login">
              <div className="bg-[#ebf1f7] rounded-xl flex items-center gap-2 px-3 py-2 hover:opacity-80 hover:underline active:opacity-60 ">
                {" "}
                Login{" "}
              </div>{" "}
            </Link>
          </div>
          <div className="flex items-center">
            {" "}
            <Link className="contents" href="/register/student">
              <div className="bg-[#ebf1f7] rounded-xl flex items-center gap-2 px-3 py-2  hover:opacity-80  hover:underline transition-all duration-300 ease-in-out  active:opacity-60 ">
                {" "}
                Register as student
              </div>{" "}
            </Link>
          </div>{" "}
          <div className="flex items-center">
            {" "}
            <Link className="contents" href="/register/company">
              <div className="bg-[#ebf1f7] rounded-xl flex items-center gap-2 px-3 py-2  hover:opacity-80 hover:underline transition-all duration-300 ease-in-out active:opacity-60 ">
                {" "}
                Register as company
              </div>{" "}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
