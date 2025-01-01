"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/auth/Header";

export default function RegisterPage() {
  return (
    <main className="flex overflow-hidden">
      <motion.section className="hidden lg:block w-1/2 p-5 bg-purple-600" initial={{ x: "-100%" }} animate={{ x: 0 }} transition={{ duration: 0.7 }}>
        <header className="text-2xl font-bold text-white">
          <span className="outline-text">Next</span>Walls
        </header>
        <style jsx>
          {`
            .outline-text {
              -webkit-text-stroke: 1px white;
              color: transparent;
            }
          `}
        </style>
      </motion.section>
      <motion.section className="w-full lg:w-1/2 p-5" initial={{ x: "100%" }} animate={{ x: 0 }} transition={{ duration: 0.7 }}>
        <div className="my-14 py-[3.33rem] w-full flex justify-center items-center">
          <form className="w-full md:w-1/2">
            <Header />
            <div className="mb-5 flex flex-col">
              <label className="text-lg text-slate-600 font-semibold mb-1" htmlFor="email">
                Email address
              </label>
              <input className="text-black p-3 border rounded border-slate-600" type="email" name="email" id="email" />
            </div>
            <div className="mb-5 flex flex-col">
              <label className="text-lg text-slate-600 font-semibold mb-1" htmlFor="password">
                Password
              </label>
              <input className="text-black p-3 border rounded border-slate-600" type="password" name="password" id="password" />
            </div>
            <div className="mb-5 flex flex-col">
              <label className="text-lg text-slate-600 font-semibold mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input className="text-black p-3 border rounded border-slate-600" type="password" name="confirmPassword" id="confirmPassword" />
            </div>
            <button className="w-full bg-purple-600 text-white rounded p-3 mb-5 hover:bg-purple-700 active:scale-90 transition-all duration-200 cursor-pointer" type="submit">
              Sign Up
            </button>
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline text-purple-400">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </motion.section>
    </main>
  );
}
