import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/src/components/site-shell";
import MeetupCard from "@/src/components/activities/MeetupCard";
import { PageHero } from "@/src/components/Hero";
import { createClient } from "@/src/lib/supabase/server";
import { format } from "date-fns";

export default async function ActivitiesPage() {
  const supabase = await createClient();

  const today = new Date().toISOString().split("T")[0];

  const { data: meetups, error } = await supabase
    .from("activities")
    .select("*")
    .gte("meetup_date", today)
    .order("meetup_date", { ascending: true });


  if (error) {
    return (
      <SiteShell>
        <main className="mx-auto max-w-5xl px-6 py-12">
          <h1 className="font-serif text-3xl font-semibold text-accent">
            Activities
          </h1>

          <p className="mt-4 text-red-500">
            Failed to load activities.
          </p>
        </main>
      </SiteShell>
    );
  }


  return (
    <SiteShell>

      <PageHero
        eyebrow="Activities"
        title="Something to enjoy every day"
        description="From gentle exercise to games, crafts, and shared meals - here is what is happening at the club each week. Most sessions are drop-in, so simply come along."
      />


      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">

        {meetups?.length === 0 ? (

          <p className="text-center text-lg text-muted-foreground">
            Our new schedule is being prepared. Please check back soon or contact us for details.
          </p>

        ) : (

          <div className="space-y-14">

            {meetups?.map((meetup) => (

              <div key={meetup.id}>

                {/* Date Header */}
                <div className="mb-6 flex items-center gap-4">

                  <h2 className="font-serif text-2xl font-semibold text-accent md:text-3xl">
                    {format(
                      new Date(meetup.meetup_date),
                      "EEEE, d MMMM"
                    )}
                  </h2>

                  <span className="h-px flex-1 bg-border" />

                </div>


                {/* Card */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                  <MeetupCard
                    meetup={meetup}
                  />

                </div>

              </div>

            ))}

          </div>

        )}


        {/* Contact CTA */}
        <div className="mt-16 rounded-3xl border border-border bg-secondary/40 px-6 py-10 text-center md:py-12">

          <h2 className="font-serif text-2xl font-semibold text-balance text-accent md:text-3xl">
            Not sure where to start?
          </h2>


          <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Get in touch and we will help you find the activities you will love most - or just come in for a cuppa and a chat.
          </p>


          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ask us anything
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>

        </div>


      </section>

    </SiteShell>
  );
}