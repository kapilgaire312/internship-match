import Image from "next/image";
import Link from "next/link";
export default function StudentNavbar() {
  return (
    <nav className="sticky top-0 z-10 bg-[#f5f6fc] transition-all-300">
      {" "}
      <div className="flex justify-between py-5 px-10 select-none sticky">
        <Link href="/student/home" className="contents">
          {" "}
          <div className="relative w-54 h-13">
            <Image src="/InternKaji.webp" alt="logo" fill />
          </div>
        </Link>
        <div className="flex gap-9 text-">
          <div className="flex items-center">
            {" "}
            <div className="bg-[#ebf1f7] rounded-xl flex items-center pr-2 ">
              <Link className="contents" href="/student/home">
                {" "}
                <div className="relative h-12 w-10 bottom-0.5">
                  {" "}
                  <Image src="/home-logo.webp" alt="home-logo" fill />{" "}
                </div>
                Home
              </Link>
            </div>{" "}
          </div>
          <div className="flex items-center">
            {" "}
            <div className="bg-[#ebf1f7] rounded-xl flex items-center pr-2">
              <Link className="contents" href="/student/matches">
                {" "}
                <div className="relative h-12 w-10">
                  {" "}
                  <Image src="/matches-logo.webp" alt="home-logo" fill />{" "}
                </div>
                Matches{" "}
              </Link>
            </div>{" "}
          </div>
          <div className="flex items-center">
            {" "}
            <div className="bg-[#ebf1f7] rounded-xl flex items-center pr-2 ">
              {" "}
              <Link className="contents" href="/student/applied">
                <div className="relative h-12 w-10 bottom-0.5">
                  {" "}
                  <Image src="/applied-logo.webp" alt="home-logo" fill />{" "}
                </div>
                Applied{" "}
              </Link>
            </div>{" "}
          </div>

          <div className="flex items-center">
            {" "}
            <div className="bg-[#ebf1f7] rounded-xl flex items-center pr-3 ">
              {" "}
              <Link className="contents" href="/student/profile">
                <div className="relative h-12 w-10 bottom-1 mr-0.5">
                  {" "}
                  <Image src="/profile-logo.webp" alt="home-logo" fill />{" "}
                </div>
                Profile{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
