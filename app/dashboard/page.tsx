import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Sun,
  CalendarDays,
  ImageIcon,
  Mail,
  LogOut,
  ExternalLink,
} from "lucide-react";

import { createClient } from "@/src/lib/supabase/server";
import LogoutButton from "@/src/components/LogoutButton";


export default async function DashboardPage() {

  const supabase = await createClient();


  const {
    data: { user },
  } = await supabase.auth.getUser();



  if (!user) {
    redirect("/login");
  }



  const { count: activityCount } = await supabase
    .from("activities")
    .select("*", {
      count: "exact",
      head: true,
    });



  const { count: galleryCount } = await supabase
    .from("gallery_images")
    .select("*", {
      count: "exact",
      head: true,
    });



  const { count: unreadCount } = await supabase
    .from("contact_submissions")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("is_read", false);



  return (

    <div className="min-h-screen bg-secondary/30">


      {/* Header */}

      <header className="border-b border-border bg-background">

        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">


          <div className="flex items-center gap-3">

            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">

              <Sun
                className="size-5"
                aria-hidden="true"
              />

            </span>


            <div>

              <p className="font-serif text-lg font-semibold text-accent">
                Club Dashboard
              </p>

              <p className="text-xs text-muted-foreground">
                Seniors on Main Club
              </p>

            </div>

          </div>



          <div className="flex items-center gap-2">


            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-accent hover:bg-secondary"
            >

              <ExternalLink className="size-4" />

              View Site

            </Link>


            <LogoutButton />

          </div>


        </div>

      </header>





      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">


        {/* Stats */}

        <div className="grid gap-6 sm:grid-cols-3">


          <div className="rounded-2xl border border-border bg-card p-5">

            <p className="text-sm font-semibold text-muted-foreground">
              Total Activities
            </p>


            <p className="mt-1 font-serif text-3xl font-semibold text-accent">
              {activityCount ?? 0}
            </p>


          </div>



          <div className="rounded-2xl border border-border bg-card p-5">

            <p className="text-sm font-semibold text-muted-foreground">
              Gallery Photos
            </p>


            <p className="mt-1 font-serif text-3xl font-semibold text-accent">
              {galleryCount ?? 0}
            </p>


          </div>





          <div className="rounded-2xl border border-border bg-card p-5">

            <p className="text-sm font-semibold text-muted-foreground">
              Unread Messages
            </p>


            <p className="mt-1 font-serif text-3xl font-semibold text-accent">
              {unreadCount ?? 0}
            </p>


          </div>





          <div className="rounded-2xl border border-border bg-card p-5">

            <p className="text-sm font-semibold text-muted-foreground">
              Logged in as
            </p>


            <p className="mt-2 truncate text-sm font-semibold text-primary">
              {user.email}
            </p>


          </div>



        </div>





        {/* Management */}

        <section className="mt-10">


          <h2 className="font-serif text-2xl font-semibold text-accent">
            Manage Website
          </h2>



          <div className="mt-5 grid gap-6 md:grid-cols-2">



            <Link
              href="/dashboard/activities"
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
            >

              <div className="flex items-center gap-3">


                <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">

                  <CalendarDays className="size-6" />

                </span>


                <h3 className="font-serif text-xl font-semibold text-accent">
                  Manage Activities
                </h3>


              </div>


              <p className="mt-4 text-muted-foreground">
                Add, edit, and remove club activities and upcoming events.
              </p>


            </Link>





            <Link
              href="/dashboard/gallery"
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
            >

              <div className="flex items-center gap-3">


                <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">

                  <ImageIcon className="size-6" />

                </span>


                <h3 className="font-serif text-xl font-semibold text-accent">
                  Manage Gallery
                </h3>


              </div>


              <p className="mt-4 text-muted-foreground">
                Upload, edit, and delete photos from the club gallery.
              </p>


            </Link>





            <Link
              href="/dashboard/contact"
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
            >

              <div className="flex items-center gap-3">


                <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">

                  <Mail className="size-6" />

                </span>


                <h3 className="font-serif text-xl font-semibold text-accent">
                  Contact Messages
                </h3>


              </div>


              <p className="mt-4 text-muted-foreground">
                View and respond to messages from the contact form.
              </p>


            </Link>



          </div>


        </section>



      </main>


    </div>

  );
}