"use client";

import Button from "@/components/auth/Button";
import Header from "@/components/auth/Header";
import Input from "@/components/auth/Input";
import Label from "@/components/auth/Label";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <main className="flex overflow-hidden">
      <motion.section className="w-full lg:w-1/2 p-5" initial={{ x: "-100%" }} animate={{ x: 0 }} transition={{ duration: 0.7 }}>
        <header className="text-2xl font-bold text-slate-800">
          <span className="text-purple-400">Next</span>Walls
        </header>
        <div className="my-11 py-[2.88rem] w-full flex justify-center items-center">
          <form className="w-full md:w-1/2">
            <Header />
            <div className="mb-5 flex flex-col">
              <Label htmlFor="email" className="text-lg mb-1">
                Email address
              </Label>
              <Input type="email" name="email" id="email" className="p-3" />
            </div>
            <div className="mb-5 flex flex-col">
              <Label htmlFor="password" className="text-lg mb-1">
                Password
              </Label>
              <Input type="password" name="password" id="password" className="p-3" />
            </div>
            <div className="mb-5 flex justify-between">
              <div className="flex items-center gap-2">
                <input className="h-4 w-4 border border-gray-300 rounded text-white checked:bg-purple-600" type="checkbox" name="remember" id="remember" />
                <label className="text-sm text-slate-600" htmlFor="remember">
                  Remember for 30 days
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm underline text-purple-400">
                Forgot Password
              </Link>
            </div>
            <Button className="w-full bg-purple-600 text-white p-3 mb-5 hover:bg-purple-700" type="submit">
              Sign In
            </Button>
            <Button className="w-full bg-slate-100 text-slate-600 p-3 mb-5 hover:bg-slate-200" type="button">
              <FcGoogle className="text-2xl" /> Sign in with Google
            </Button>
            <p className="text-sm text-center">
              Don{`'`}t have an account?{" "}
              <Link href="/auth/register" className="underline text-purple-400">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </motion.section>
      <motion.section className="w-1/2 bg-purple-600 hidden lg:block" initial={{ x: "100%" }} animate={{ x: 0 }} transition={{ duration: 0.7 }}></motion.section>
    </main>
  );
}
