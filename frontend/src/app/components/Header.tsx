import Image from "next/image";
import svgg from "../../../public/img/sports-mode-svgrepo-com.svg";
import Link from "next/link";
import { cookies } from "next/headers";
import axios from "axios";
import { getUsername } from "./GetUser";

const Header = async () => {
  // const username = await getUsername();
  return (
    <header className="bg-white ">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="#">
              <span className="sr-only">Home</span>

              <div className="word text-4xl text-blue-600 font-bold">Sport</div>
            </a>
          </div>
          <div className="md:flex md:items-center md:gap-12">
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <>
                  <Link
                    className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm"
                    href="/login"
                  >
                    Login
                  </Link>
                  <div className="hidden sm:flex">
                    <Link
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-bold text-blue-600"
                      href="/register"
                    >
                      Register
                    </Link>
                  </div>
                </>
              </div>
              <div className="block md:hidden">
                <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
