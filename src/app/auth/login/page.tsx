"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

export default function LoginPage() {
    return (
        <main className="flex overflow-hidden">
            <motion.section className="w-1/2 p-5" initial={{ x: "-100%" }} animate={{ x: 0 }} transition={{ duration: 0.7 }}>
                <header className="text-2xl font-bold text-slate-800"><span className="text-purple-400">Next</span>Walls</header>
                <div className="my-12 py-11 w-full flex justify-center items-center">
                    <form className="w-1/2">
                        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                        <p className="mb-4 text-slate-500">Please enter your details</p>
                        <div className="mb-5 flex flex-col">
                            <label className="text-lg text-slate-600 font-semibold mb-1" htmlFor="email">Email address</label>
                            <input className="text-black p-3 border rounded border-slate-600" type="email" name="email" id="email" />
                        </div>
                        <div className="mb-5 flex flex-col">
                            <label className="text-lg text-slate-600 font-semibold mb-1" htmlFor="password">Password</label>
                            <input className="text-black p-3 border rounded border-slate-600" type="password" name="password" id="password" />
                        </div>
                        <div className="mb-5 flex justify-between">
                            <div className="flex items-center gap-2">
                                <input className="h-4 w-4 border border-gray-300 rounded text-white checked:bg-purple-600" type="checkbox" name="remember" id="remember" />
                                <label className="text-sm text-slate-600" htmlFor="remember">Remember for 30 days</label>
                            </div>
                            <Link href="/auth/forgot-password" className="text-sm underline text-purple-400">Forgot Password</Link>
                        </div>
                        <button className="w-full bg-purple-600 text-white rounded p-3 mb-5 hover:bg-purple-700 active:scale-90 transition-all duration-200 cursor-pointer" type="submit">Sign In</button>
                        <button className="w-full flex justify-center items-center gap-2 bg-slate-100 rounded p-3 mb-5 hover:bg-slate-200 active:scale-90 transition-all duration-200 cursor-pointer"><FcGoogle className="text-2xl" /> Sign in with Google</button>
                        <p className="text-sm text-center">Don{`'`}t have an account? <Link href="/auth/register" className="underline text-purple-400">Sign Up</Link></p>
                    </form>
                </div>
            </motion.section>
            <motion.section className="w-1/2 bg-purple-600" initial={{ x: "100%" }} animate={{ x: 0 }} transition={{ duration: 0.7 }}>

            </motion.section>
        </main>
    )
}