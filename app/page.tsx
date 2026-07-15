import { createClient } from "@/src/lib/supabase/server";
import MeetupCard from "@/src/components/activities/MeetupCard";
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Heart, Users, Sparkles, HandHeart, Clock, MapPin } from "lucide-react"
import { FaqSection } from "@/src/components/FAQ"
import { SiteShell } from "@/src/components/site-shell"

export default async function Home() {
  const supabase = await createClient();

  const today = new Date().toISOString().split("T")[0];

  const { data: meetups } = await supabase
    .from("activities")
    .select("*")
    .gte("meetup_date", today)
    .order("meetup_date", { ascending: true })
    .limit(3);

  return (
    <SiteShell>
    <div className="bg-white">
      <section className="bg-secondary/40">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1.5 text-sm font-bold text-primary">
              <Sparkles className="size-4" aria-hidden="true" />
              Welcoming new members every week
            </span>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-balance text-accent md:text-6xl">
              Friendship, fun and community on Main Street
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
              Seniors on Main Club is a warm, welcoming place for older adults to connect, stay active, and enjoy life
              together. Come as you are - there is always a friendly face and a cup of tea waiting.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Join the Club
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <Link
                href="/activities"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-accent/20 bg-card px-7 py-3.5 text-lg font-bold text-accent transition-colors hover:bg-secondary"
              >
                See Activities
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
              <Image
                src="/hero-seniors.png"
                alt="A group of smiling senior club members enjoying coffee together"
                width={720}
                height={560}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-border bg-card px-5 py-4 shadow-md sm:block">
              <p className="font-serif text-3xl font-semibold text-primary">200+</p>
              <p className="text-sm font-semibold text-muted-foreground">happy members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why join */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Why members love us</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-balance text-accent md:text-4xl">
            More than a club - it is a second family
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Genuine connection",
              text: "Make lasting friendships over shared meals, games, and good conversation in a relaxed setting.",
            },
            {
              icon: Heart,
              title: "Stay active & well",
              text: "Gentle exercise, walking groups, and wellbeing sessions designed for every level of mobility.",
            },
            {
              icon: HandHeart,
              title: "Always supported",
              text: "A caring team and volunteer network here to help with transport, questions, and a warm welcome.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-7 text-center shadow-sm">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                <item.icon className="size-7" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-accent">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Testimonial */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center md:px-6 md:py-24">
        <blockquote className="font-serif text-2xl font-medium leading-relaxed text-balance text-accent md:text-3xl">
          &ldquo;After my husband passed, the days felt very long. The club gave me a reason to get up, get dressed, and
          smile again. These people are my friends now.&rdquo;
        </blockquote>
        <p className="mt-6 text-lg font-bold text-primary">Margaret, member since 2021</p>
      </section>
      
      {/* Activities */}
      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="mb-10 flex items-center justify-between">

          <div>

            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-widest text-primary">This week at the club</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-balance text-accent md:text-4xl">
                A little something for everyone
              </h2>
            </div>

          </div>

            <Link
              href="/activities"
              className="inline-flex items-center gap-2 rounded-full border-2 border-accent/20 bg-card px-5 py-2.5 font-bold text-accent transition-colors hover:bg-secondary"
            >
              View full schedule
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {meetups?.map((meetup) => (
            <MeetupCard
              key={meetup.id}
              meetup={meetup}
              compact
            />
          ))}

        </div>

      </section>

      {/* FAQ */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Good to know</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-balance text-accent md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Everything you might want to know before your first visit. Still curious? We are only a phone call away.
            </p>
          </div>
          <div className="mt-12">
            <FaqSection />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="rounded-3xl bg-accent px-6 py-12 text-center text-accent-foreground md:px-12 md:py-16">
          <h2 className="font-serif text-3xl font-semibold text-balance md:text-4xl">Come and say hello</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-accent-foreground/85">
            Your first visit is always free. Drop in for a cup of tea, meet the team, and see if we are the right fit for
            you. No pressure, just a friendly welcome.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get in touch
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <span className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-accent-foreground/85">
              <span className="flex items-center gap-2">
                <Clock className="size-5 text-primary" aria-hidden="true" />
                Mon-Sat, 9am-4pm
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-5 text-primary" aria-hidden="true" />
                124 Main Street
              </span>
            </span>
          </div>
        </div>
      </section>
    </div>
    </SiteShell>
  );
}
