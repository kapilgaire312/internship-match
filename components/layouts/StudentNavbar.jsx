import Image from "next/image";
import Link from "next/link";
export default function StudentNavbar() {
  return (
    <nav className="sticky top-0 z-10 bg-[#f5f6fc] transition-all-300">
      {" "}
      <div className="flex justify-between py-5 px-8 select-none sticky items-center">
        <Link href="/student/home" className="contents">
          {" "}
          <div className="relative w-54 h-13">
            <Image
              src="/InternKaji.webp"
              loading="eager"
              alt="logo"
              sizes="(min-width: 6 vw) 33vw"
              fill
            />
          </div>
        </Link>
        <div className="flex gap-9 text-">
          <div className="flex items-center">
            {" "}
            <Link className="contents" href="/student/home">
              <div className="bg-[#ebf1f7] rounded-xl flex items-center gap-1 px-2 py-1 hover:opacity-80 active:opacity-60 ">
                {" "}
                <div className="relative h-5 w-6 ">
                  {" "}
                  <Image src="/home-icon.svg" alt="home-logo" fill />{" "}
                </div>
                Home
              </div>{" "}
            </Link>
          </div>
          <div className="flex items-center">
            {" "}
            <Link className="contents" href="/student/matches">
              <div className="bg-[#ebf1f7] rounded-xl flex items-center gap-2 px-2 py-1 hover:opacity-80 active:opacity-60 ">
                {" "}
                <div className="relative h-4 w-4">
                  {" "}
                  <Image src="/matches-icon.svg" alt="home-logo" fill />{" "}
                </div>
                Matches{" "}
              </div>{" "}
            </Link>
          </div>
          <div className="flex items-center">
            {" "}
            <Link className="contents" href="/student/applied">
              <div className="bg-[#ebf1f7] rounded-xl flex items-center gap-2 px-2 py-1  hover:opacity-80 active:opacity-60 ">
                {" "}
                <div className="relative h-4 w-4 ">
                  {" "}
                  <Image src="/applied-icon.svg" alt="home-logo" fill />{" "}
                </div>
                Applied{" "}
              </div>{" "}
            </Link>
          </div>

          <div className="flex items-center">
            {" "}
            <Link className="contents" href="/student/profile">
              <div className="bg-[#ebf1f7] rounded-xl flex items-center gap-2 px-2 py-1 hover:opacity-80 active:opacity-60 ">
                {" "}
                <div className="relative h-4 w-4 ">
                  {" "}
                  <Image src="/profile-icon.svg" alt="home-logo" fill />{" "}
                </div>
                Profile{" "}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
