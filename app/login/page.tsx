"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";
import { Lock, Sun, Mail } from "lucide-react";
import Link from "next/link";


export default function LoginPage() {

  const supabase = createClient();
  const router = useRouter();


  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");



  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    setLoading(true);
    setError("");


    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });



    setLoading(false);



    if (error) {
      setError(error.message);
      return;
    }


    router.push("/dashboard");
    router.refresh();

  }



  return (

    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">


      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-lg">


        <div className="flex flex-col items-center text-center">


          <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">

            <Sun
              className="size-7"
              aria-hidden="true"
            />

          </span>



          <h1 className="mt-4 font-serif text-2xl font-semibold text-accent">
            Staff Login
          </h1>



          <p className="mt-2 text-muted-foreground">
            Sign in to manage the Seniors on Main Club website.
          </p>


        </div>




        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-4"
        >


          {error && (

            <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-base font-semibold text-destructive">
              {error}
            </p>

          )}



          <div>


            <label
              htmlFor="email"
              className="mb-1.5 block text-base font-semibold text-accent"
            >
              Email
            </label>



            <div className="relative">


              <Mail
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />



              <input
                id="email"
                type="email"
                required
                autoFocus
                placeholder="admin@seniorclub.co.za"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-4 text-lg text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
              />


            </div>


          </div>





          <div>


            <label
              htmlFor="password"
              className="mb-1.5 block text-base font-semibold text-accent"
            >
              Password
            </label>



            <div className="relative">


              <Lock
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />



              <input
                id="password"
                type="password"
                required
                placeholder="********"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-4 text-lg text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
              />


            </div>


          </div>





          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary px-6 py-3 text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
          >

            {loading
              ? "Signing in..."
              : "Sign in"}

          </button>



        </form>




        <Link
          href="/"
          className="mt-5 block w-full rounded-full border border-border bg-card px-6 py-3 text-center text-lg font-semibold text-accent transition hover:bg-secondary"
        >
          Back to Home
        </Link>



      </div>


    </div>

  );

}