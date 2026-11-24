
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
  email: email.trim(),
  password,
});

console.log("Login result:", { data, error });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center px-5 text-white">
      <div className="w-full max-w-md">

        {/* H&Z STUDIOS LOGO */}
        <div className="flex flex-col items-center mb-10">
          <svg viewBox="0 0 200 200" className="w-36 h-36">
            <circle cx="100" cy="100" r="91"
              fill="none" stroke="#777" strokeWidth="2" />
            <circle cx="100" cy="100" r="82"
              fill="none" stroke="#c0c0c0" strokeWidth="2" />
            <path d="M100 5 L105 15 L100 25 L95 15 Z"
              fill="#e5e5e5" />
            <text x="100" y="108" textAnchor="middle"
              fill="#e5e5e5" fontSize="49" fontWeight="900"
              letterSpacing="-4">
              H&amp;Z
            </text>
            <path d="M43 122 H157"
              stroke="#999" strokeWidth="1.5" />
            <text x="100" y="140" textAnchor="middle"
              fill="#c0c0c0" fontSize="13" letterSpacing="5">
              STUDIOS
            </text>
          </svg>

          <h1 className="text-3xl font-bold tracking-[0.25em] mt-3">
            H&amp;Z STUDIOS
          </h1>
          <p className="text-gray-500 text-xs tracking-[0.3em] mt-2">
            ADMINISTRATION PORTAL
          </p>
        </div>

        {/* LOGIN FORM */}
        <div className="bg-[#111] border border-[#333] rounded-xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 text-sm mb-7">
            Sign in to access the H&amp;Z control centre.
          </p>

          <form
  onSubmit={(e) => {
    console.log("LOGIN BUTTON WORKS");
    handleLogin(e);
  }}
  className="space-y-5"
>
            <div>
              <label className="text-sm text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hzstudios.com"
                className="w-full mt-2 p-3 bg-black border border-[#444] rounded-lg outline-none focus:border-gray-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-2 p-3 bg-black border border-[#444] rounded-lg outline-none focus:border-gray-300"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gray-200 text-black font-bold rounded-lg hover:bg-white transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-8">
          H&amp;Z STUDIOS © 2026. ALL RIGHTS RESERVED.
        </p>
      </div>
    </main>
  );
}
