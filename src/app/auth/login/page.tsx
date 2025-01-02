"use client";

import Header from "@/components/auth/Header";
import Label from "@/components/auth/Label";
import Input from "@/components/auth/Input";
import Checkbox from "@/components/auth/Checkbox";
import Button from "@/components/auth/Button";
import Background from "@/components/auth/Background";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.ok) {
        setError("");
        setIsLoading(false);
        const session = await getSession();
        if (session) {
          const role = session.user.role;

          if (role === "ADMIN") {
            push("/admin");
          } else {
            push("/");
          }
        }
      }
    } catch (error) {
      setError((error as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <main className="flex overflow-hidden">
      <motion.section className="w-full lg:w-1/2 p-5" initial={{ x: "-100%" }} animate={{ x: 0 }} transition={{ duration: 0.7 }}>
        <div className="my-14 py-[3.12rem] w-full flex justify-center items-center">
          <form className="w-full md:w-1/2" onSubmit={handleSubmit}>
            <Header />
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-5 flex flex-col">
              <Label className="text-lg mb-1" htmlFor="email">
                Email address
              </Label>
              <Input className="p-3" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-5 flex flex-col">
              <Label className="text-lg mb-1" htmlFor="password">
                Password
              </Label>
              <Input className="p-3" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-5 flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox className="checked:bg-purple-600" name="remember" id="remember" />
                <Label className="text-sm" htmlFor="remember">
                  Remember for 30 days
                </Label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm underline text-purple-400">
                Forgot Password
              </Link>
            </div>
            <Button className="w-full bg-purple-600 text-white p-3 mb-5 hover:bg-purple-700" type="submit">
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
            <Button className="w-full bg-slate-100 text-slate-600 p-3 mb-5 hover:bg-slate-200" type="button" onClick={() => signIn("google")}>
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
      <Background x="100%" />
    </main>
  );
}
