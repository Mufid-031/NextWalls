"use client";

import Header from "@/components/auth/Header";
import Label from "@/components/auth/Label";
import Input from "@/components/auth/Input";
import Button from "@/components/auth/Button";
import Background from "@/components/auth/Background";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post("/api/register", {
        email,
        password,
      });

      if (response.status === 200) {
        setError("");
        setIsLoading(false);
        push("/auth/login");
      }
    } catch (error) {
      setError((error as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <main className="flex overflow-hidden">
      <Background x="-100%" />
      <motion.section 
        className="w-full lg:w-1/2 p-5" 
        initial={{ x: "100%" }} 
        animate={{ x: 0 }} 
        exit={{ x: "100%" }}
        transition={{ duration: 0.7 }}
      >
        <div className="my-14 py-[3.33rem] w-full flex justify-center items-center">
          <form className="w-full md:w-1/2" onSubmit={handleSubmit}>
            <Header />
            {error && <p className="text-red-500 mb-5">{error}</p>}
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
            <div className="mb-5 flex flex-col">
              <Label className="text-lg mb-1" htmlFor="confirmPassword">
                Confirm Password
              </Label>
              <Input className="p-3" type="password" name="confirmPassword" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <Button className="w-full bg-purple-600 text-white rounded p-3 mb-5 hover:bg-purple-700" type="submit">
              {isLoading ? "Registering..." : "Register"}
            </Button>
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline text-purple-400">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </motion.section>
    </main>
  );
}
